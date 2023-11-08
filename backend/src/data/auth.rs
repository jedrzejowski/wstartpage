use actix_web::{FromRequest, HttpRequest, http::header};
use actix_web::dev::Payload;
use actix_web_httpauth::extractors::basic::BasicAuth;
use futures::future::{Ready, ready};
use crate::utils::http::AppHttpError;
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
    let basic_auth = match BasicAuth::from_request(req, payload).into_inner() {
      Ok(basic_auth) => basic_auth,
      Err(_) => return ready(Err(AppHttpError::bad_request("basic auth parse failed"))),
    };

    let password = match basic_auth.password() {
      None => return ready(Err(AppHttpError::bad_request(""))),
      Some(password) => password,
    };

    let app_user = AppUser {
      username:basic_auth.user_id().to_string(),
      password:password.to_string(),
    };

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

    return ready(Ok(app_user));
  }
}
