use std::collections::HashMap;
use std::future::Future;
use std::pin::Pin;
use actix_web::{FromRequest, HttpRequest};
use actix_web::dev::Payload;
use actix_web_httpauth::extractors::basic::BasicAuth;
use futures::future::LocalBoxFuture;
use crate::utils::http::AppHttpError;
use serde::{Deserialize, Serialize};
use crate::user_source::{UserSourceService};

const SESSION_KEY: &str = "app_user";

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct AppUser {
  pub display_name: String,
  pub username: String,
}

impl FromRequest for AppUser {
  type Error = AppHttpError;
  type Future = LocalBoxFuture<'static, Result<Self, Self::Error>>;

  fn from_request(req: &HttpRequest, _: &mut Payload) -> Self::Future {
    let req = req.clone();
    Box::pin(async move {
      let basic_auth = match BasicAuth::from_request(&req, &mut Payload::None).into_inner() {
        Ok(basic_auth) => basic_auth,
        Err(_) => return Err(AppHttpError::bad_request("basic auth parse failed")),
      };

      let username = basic_auth.user_id();
      let password = match basic_auth.password() {
        None => return Err(AppHttpError::bad_request("")),
        Some(password) => password,
      };

      let user_source: &UserSourceService = req.app_data().unwrap();
      let app_user = user_source.auth_user(HashMap::from([
        ("username".to_owned(), username.to_owned()),
        ("password".to_owned(), password.to_owned()),
      ])).await;

      match app_user {
        Ok(app_user) => Ok(app_user),
        Err(_) => Err(AppHttpError::unauthorized(())),
      }
    })

    //
    // let app_user = AppUser {
    //   username: basic_auth.user_id().to_string(),
    //   password: password.to_string(),
    // };

    // let session = Session::from_request(req, payload).into_inner();
    //
    // if session.is_err() {
    //   return ready(Err(AppHttpError::internal(())));
    // }
    //
    // let session = session.unwrap();
    //
    // let app_user = session.get::<AppUser>(SESSION_KEY);
    //
    // if app_user.is_err() {
    //   return ready(Err(AppHttpError::unauthorized(())));
    // }
    //
    // let app_user = app_user.unwrap();
    //
    // if app_user.is_none() {
    //   return ready(Err(AppHttpError::unauthorized(())));
    // }
    //
    // let app_user = app_user.unwrap();

    // return ready(Ok(app_user));
  }
}
