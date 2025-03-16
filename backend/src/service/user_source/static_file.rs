use std::borrow::Borrow;
use std::collections::HashMap;
use std::path::Path;
use std::sync::Arc;
use anyhow::{anyhow, Result, Context};
use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha512};
use crate::model::user_info::AppUserInfo;
use crate::service::app_config::AppConfigBean;
use super::{UserSource, UserSourceBean, UserSourceError};

#[derive(Debug, Default)]
pub struct StaticFileUserSource {
  algo: Algo,
  users: Vec<StaticUser>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct StaticUser {
  display_name: String,
  username: String,
  password_hash: String,
}

#[derive(Debug, Clone)]
enum Algo {
  Sha512,
}

impl StaticFileUserSource {
  pub fn new() -> Self {
    Self::default()
  }

  pub fn from_config(app_config: &AppConfigBean) -> Result<UserSourceBean> {
    let mut this = StaticFileUserSource::new();

    let cfg_reader = app_config.cfg_reader("user_source");

    if let Some(algo_str) = cfg_reader.get_optional("algo") {
      this.set_algo_from_string(algo_str)?;
    }

    let file_path = cfg_reader.get_required("file");
    this.load_users_from_file(file_path)?;

    Ok(Arc::new(Box::new(this)))
  }


  pub fn set_algo_from_string(&mut self, algo_str: impl AsRef<str>) -> Result<()> {
    self.algo = Algo::try_from_string(algo_str)?;

    Ok(())
  }

  pub fn load_users_from_file(&mut self, path: impl AsRef<Path>) -> Result<()> {
    let mut reader = csv::Reader::from_path(path)
      .context("reading csv file")?;

    for record in reader.deserialize() {
      self.users.push(record?);
    }

    Ok(())
  }
}

#[async_trait]
impl UserSource for StaticFileUserSource {
  async fn auth_user(&self, attributes: HashMap<String, String>) -> Result<AppUserInfo, UserSourceError> {
    let username = attributes.get("username").ok_or(UserSourceError::BadAttributes)?;
    let password = attributes.get("password").ok_or(UserSourceError::BadAttributes)?;

    let user = self.users.iter()
      .find(|user| &user.username == username)
      .ok_or(UserSourceError::Unauthorized)?;

    if !self.algo.verify(password, &user.password_hash) {
      return Err(UserSourceError::Unauthorized);
    }

    Ok(AppUserInfo {
      display_name: user.display_name.to_owned(),
      username: user.username.to_owned(),
    })
  }
}

impl Algo {
  pub fn try_from_string(algo_str: impl AsRef<str>) -> Result<Algo> {
    return Ok(match algo_str.as_ref() {
      "sha512" => Algo::Sha512,
      alg => return Err(anyhow!("unknown algorithm named '{}'", alg))
    });
  }

  pub fn hash(&self, password: impl AsRef<[u8]>) -> String {
    match &self {
      Algo::Sha512 => {
        let mut hasher = Sha512::new();
        hasher.update(password);
        return hex::encode(hasher.finalize());
      }
    };
  }

  pub fn verify(&self, password: &String, hash: &String) -> bool {
    match &self {
      Algo::Sha512 => {
        return &self.hash(password) == hash;
      }
    };
  }
}

impl Default for Algo {
  fn default() -> Self {
    Algo::Sha512
  }
}
