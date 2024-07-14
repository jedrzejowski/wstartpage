use std::borrow::Borrow;
use std::collections::HashMap;
use std::ops::Deref;
use std::path::Path;
use std::sync::{Arc, Mutex};
use anyhow::{anyhow, Result, Context};
use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha512};
use crate::model::user_info::AppUserInfo;
use super::{UserSource, UserSourceError};

#[derive(Debug, Default)]
pub struct StaticFileUserSource(Mutex<Arc<InnerState>>);

#[derive(Debug, Default, Clone)]
struct InnerState {
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

  pub fn set_algo_from_string(&self, algo_str: impl AsRef<str>) -> Result<()> {
    let algo = Algo::try_from_string(algo_str)?;

    let mut inner_state = self.get_inner_state().deref().clone();

    inner_state.algo = algo;

    self.set_inner_state(inner_state);

    Ok(())
  }

  pub fn load_users_from_file(&self, path: impl AsRef<Path>) -> Result<()> {
    let mut inner_state = self.get_inner_state().deref().clone();

    let mut reader = csv::Reader::from_path(path)
      .context("reading csv file")?;

    for record in reader.deserialize() {
      inner_state.users.push(record?);
    }

    self.set_inner_state(inner_state);

    Ok(())
  }

  fn get_inner_state(&self) -> Arc<InnerState> {
    self.0.lock().unwrap().clone()
  }

  fn set_inner_state(&self, new_inner_state: InnerState) {
    let mut inner_state = self.0.lock().unwrap();
    *inner_state = Arc::new(new_inner_state);
  }
}

#[async_trait]
impl UserSource for StaticFileUserSource {
  async fn auth_user(&self, attributes: HashMap<String, String>) -> Result<AppUserInfo, UserSourceError> {
    let inner_state = self.get_inner_state();
    let username = attributes.get("username").ok_or(UserSourceError::BadAttributes)?;
    let password = attributes.get("password").ok_or(UserSourceError::BadAttributes)?;

    let user = inner_state.users.iter()
      .find(|user| &user.username == username)
      .ok_or(UserSourceError::Unauthorized)?;

    if !inner_state.algo.verify(password, &user.password_hash) {
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
