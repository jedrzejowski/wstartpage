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
  let config = app_config.prefixed_reader("user_source");

  match config.get_required("type").as_str() {
    "no" | "false" => {
      let us = NoUserSource::new();
      return Ok(Arc::new(Box::new(us)));
    }
    "static" | "staticfile" => {
      let us = StaticFileUserSource::new();

      if let Some(algo_str) = config.get_optional("algo") {
        us.set_algo_from_string(algo_str)?;
      }

      let file_path = config.get_required("file");
      us.load_users_from_file(file_path)?;

      return Ok(Arc::new(Box::new(us)));
    }
    value => panic!("unknown type '{}'", value),
  };
}
