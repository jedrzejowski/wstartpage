mod r#static;

use std::collections::HashMap;
use std::fmt::Debug;
use actix_web::web;
use async_trait::async_trait;
use crate::model::app_user::AppUser;
use thiserror::Error;

pub use r#static::StaticUserSource;

#[derive(Error, Debug)]
pub enum UserSourceError {
  #[error("wrong credentials")]
  WrongCredentials,
  #[error("bad request")]
  BadRequest,
  #[error("user not found")]
  UserNotFound(String),
  #[error("internal error")]
  Anyhow(#[from] anyhow::Error),
}

#[async_trait]
pub trait UserSource: Sync + Send + Debug {
  async fn auth_user(&self, attributes: HashMap<String, String>) -> Result<AppUser, UserSourceError>;

  fn into_service(self) -> UserSourceService
    where Self: Sized + 'static {
    web::Data::new(Box::new(self))
  }
}

pub type UserSourceService = web::Data<Box<dyn UserSource>>;
