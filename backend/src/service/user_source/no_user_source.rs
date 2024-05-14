use std::collections::HashMap;
use async_trait::async_trait;
use crate::model::user_info::AppUserInfo;
use crate::service::user_source::{UserSource, UserSourceError};

#[derive(Debug)]
pub struct NoUserSource {
  _priv: (),
}

impl NoUserSource {
  pub fn new() -> Self {
    Self { _priv: () }
  }
}

#[async_trait]
impl UserSource for NoUserSource {
  async fn auth_user(&self, attributes: HashMap<String, String>) -> Result<AppUserInfo, UserSourceError> {
    Err(UserSourceError::Unauthorized)
  }
}
