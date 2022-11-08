use std::future::Future;
use actix_session::Session;
use actix_web::{Error, FromRequest, HttpRequest, http::header};
use actix_web::dev::Payload;
use actix_web_httpauth::extractors::basic::BasicAuth;
use futures::future::{Ready, ready};
use crate::util::http::AppHttpError;
use serde::{Deserialize, Serialize};

const SESSION_KEY: &str = "app_user";

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct AppUser {
  pub username: String,
  pub password: String,
}

impl FromRequest for AppUser {
  type Error = AppHttpError;
  type Future = Ready<Result<Self, Self::Error>>;

  fn from_request(req: &HttpRequest, payload: &mut Payload) -> Self::Future {
    let session = Session::from_request(req, payload).into_inner();

    if session.is_err() {
      return ready(Err(AppHttpError::internal(())));
    }

    let session = session.unwrap();

    let app_user = session.get::<AppUser>(SESSION_KEY);

    if app_user.is_err() {
      return ready(Err(AppHttpError::unauthorized(())));
    }

    let app_user = app_user.unwrap();

    if app_user.is_none() {
      return ready(Err(AppHttpError::unauthorized(())));
    }

    let app_user = app_user.unwrap();

    return ready(Ok(app_user));
  }
}
