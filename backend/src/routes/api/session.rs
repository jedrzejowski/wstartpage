// use actix_session::Session;
// use actix_web::HttpResponse;
// use actix_web_httpauth::extractors::basic::BasicAuth;
// use serde_json::json;
// use crate::model::auth::AppUser;
// use crate::utils::http::{AppHttpError, AppHttpResult};
//
// pub async fn create(basic_auth: BasicAuth, session: Session) -> AppHttpResult {
//   return if basic_auth.user_id() == "admin" && basic_auth.password() == Some("Startpage123") {
//     session.insert("app_user", AppUser {
//       username: basic_auth.user_id().into(),
//       password: basic_auth.password().unwrap().into(),
//     }).map_err(|_| AppHttpError::internal(()))?;
//
//     Ok(HttpResponse::Ok().json(json!({
//       "username": basic_auth.user_id().to_string(),
//     })))
//   } else { Err(AppHttpError::unauthorized(())) }
// }
//
// pub async fn get(app_user: AppUser) -> AppHttpResult {
//   Ok(HttpResponse::Ok().json(app_user))
// }
