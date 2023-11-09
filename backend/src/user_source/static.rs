use std::collections::HashMap;
use std::path::Path;
use anyhow::{anyhow, Context};
use async_trait::async_trait;
use serde::Deserialize;
use crate::model::app_user::AppUser;
use crate::user_source::{UserSource, UserSourceError};

#[derive(Debug)]
pub struct StaticUserSource {
  users: Vec<StaticUser>,
}

#[derive(Debug, Deserialize)]
struct StaticUser {
  display_name: String,
  username: String,
  password: String,
}

impl StaticUserSource {
  pub async fn from_csv_file(path: impl AsRef<Path>) -> anyhow::Result<Self> {
    let mut reader = csv::Reader::from_path(path)
      .context("reading file")?;

    let mut users = vec![];
    for record in reader.deserialize() {
      users.push(record?);
    }

    Ok(Self { users })
  }
}

#[async_trait]
impl UserSource for StaticUserSource {
  async fn auth_user(&self, attributes: HashMap<String, String>) -> Result<AppUser, UserSourceError> {
    let username = attributes.get("username").ok_or(UserSourceError::BadRequest)?;
    let password = attributes.get("password").ok_or(UserSourceError::BadRequest)?;

    let user = self.users.iter().find(|user| &user.username == username)
      .ok_or(UserSourceError::UserNotFound(username.to_owned()))?;

    if &user.password != password {
      return Err(UserSourceError::WrongCredentials);
    }

    Ok(AppUser {
      display_name: user.display_name.to_owned(),
      username: user.username.to_owned(),
    })
  }
}
