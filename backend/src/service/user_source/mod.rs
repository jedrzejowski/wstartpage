mod r#static;
mod no_user_source;

use std::collections::HashMap;
use std::fmt::Debug;
use std::sync::Arc;
use anyhow::{anyhow, bail};
use async_trait::async_trait;
use crate::model::user_info::AppUserInfo;
use thiserror::Error;

pub use r#static::StaticUserSource;
use crate::service::app_config::AppConfigBean;
use crate::service::user_source::no_user_source::NoUserSource;

#[derive(Error, Debug)]
pub enum UserSourceError {
  #[error("unauthorized")]
  Unauthorized,
  #[error("bad request")]
  BadRequest,
  #[error("internal error")]
  Anyhow(#[from] anyhow::Error),
}

#[async_trait]
pub trait UserSource: Sync + Send + Debug {
  async fn auth_user(&self, attributes: HashMap<String, String>) -> Result<AppUserInfo, UserSourceError>;
}

pub type UserSourceService = Arc<Box<dyn UserSource>>;

pub fn from_config(app_config: &AppConfigBean) -> anyhow::Result<UserSourceService> {
  let config = app_config.prefixed("user_source");

  match config.get_required("type").as_str() {
    "no" | "false" => {
      let us = NoUserSource::new();
      return Ok(Arc::new(Box::new(us)));
    }
    "static" => {
      let us: StaticUserSource;

      if let Some(csv_file) = config.get_optional("csv") {
        us = StaticUserSource::from_csv_file(csv_file)?;
      } else {
        bail!("no file found fro static users");
      }

      return Ok(Arc::new(Box::new(us)));
    }
    value => panic!("unknown type '{}'", value),
  };
}
