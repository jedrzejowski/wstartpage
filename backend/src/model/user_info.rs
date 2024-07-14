use std::collections::HashMap;
use async_trait::async_trait;
use axum::extract::FromRequestParts;
use axum_extra::{
  headers::{authorization::Basic, Authorization},
  TypedHeader,
};
use http::request::Parts;
use crate::utils::problem_details::ProblemDetails;
use serde::{Deserialize, Serialize};
use crate::app_state::AppState;

const SESSION_KEY: &str = "app_user";

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct AppUserInfo {
  pub display_name: String,
  pub username: String,
}

#[async_trait]
impl FromRequestParts<AppState> for AppUserInfo
{
  type Rejection = ProblemDetails;

  // Required method
  async fn from_request_parts(parts: &mut Parts, state: &AppState) -> Result<Self, Self::Rejection> {
    let basic_auth = TypedHeader::<Authorization<Basic>>::from_request_parts(parts, state).await;
    let basic_auth = match basic_auth {
      Ok(ok) => ok,
      Err(err) => return Err(ProblemDetails::bad_request("failed to parse authorization header")),
    };

    let user_info = state.user_source_service.auth_user(HashMap::from([
      ("username".to_owned(), basic_auth.username().to_owned()),
      ("password".to_owned(), basic_auth.password().to_owned()),
    ])).await;

    let user_info = match user_info {
      Ok(ok) => ok,
      Err(err) => return Err(ProblemDetails::unauthorized("failed to authorize user")),
    };

    Ok(user_info)
  }
}
