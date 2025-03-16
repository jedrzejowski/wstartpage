mod static_file;
mod no_user_source;

use std::collections::HashMap;
use std::fmt::Debug;
use std::sync::Arc;
use anyhow::{Result};
use async_trait::async_trait;
use crate::model::user_info::AppUserInfo;
use thiserror::Error;

pub use static_file::StaticFileUserSource;
use crate::service::app_config::AppConfigBean;
use crate::service::user_source::no_user_source::NoUserSource;

#[derive(Error, Debug)]
pub enum UserSourceError {
  #[error("unauthorized")]
  Unauthorized,
  #[error("bad attributes")]
  BadAttributes,
  #[error("internal error")]
  Anyhow(#[from] anyhow::Error),
}

#[async_trait]
pub trait UserSource: Sync + Send + Debug {
  async fn auth_user(&self, attributes: HashMap<String, String>) -> Result<AppUserInfo, UserSourceError>;
}

pub type UserSourceBean = Arc<Box<dyn UserSource>>;

pub fn from_config(app_config: &AppConfigBean) -> Result<UserSourceBean> {
  let cfg_reader = app_config.cfg_reader("user_source");

  match cfg_reader.get_required("type").as_str() {
    "no" | "false" => {
      let us = NoUserSource::new();
      return Ok(Arc::new(Box::new(us)));
    }
    "static" | "static_file" => {
      let mut sfus = StaticFileUserSource::new();

      let file_path = cfg_reader.get_required("file");
      log::info!("creating static file user source from file: {}", file_path);
      sfus.load_users_from_file(file_path)?;

      if let Some(algo_str) = cfg_reader.get_optional("algo") {
        sfus.set_algo_from_string(algo_str)?;
      }

      return Ok(Arc::new(Box::new(sfus)));
    }
    value => panic!("unknown type '{}'", value),
  };
}
