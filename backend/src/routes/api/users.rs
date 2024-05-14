use axum::{Json};
use axum::response::IntoResponse;
use crate::model::user_info::AppUserInfo;


pub async fn me(
  app_user: AppUserInfo,
) -> impl IntoResponse {

  Json(app_user)
}
