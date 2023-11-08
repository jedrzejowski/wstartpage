use std::fs::read_dir;
use std::path::Path;
use actix_web::{HttpResponse, ResponseError, web};
use actix_web::http::StatusCode;
use crate::utils::http::{AppHttpError, AppHttpResult};
use serde::Deserialize;
use crate::app_config;
use crate::app_config::AppConfig;
use crate::data::image_attrs::ImageAttrs;
use crate::utils::security::assert_path_not_backwards;


#[derive(Deserialize)]
pub struct SearchQuery {
  path: String
}

pub async fn search(
  app_config: web::Data<AppConfig>,
  query: web::Query<SearchQuery>,
) -> AppHttpResult {
  assert_path_not_backwards(&query.path)?;

  let path = Path::new(&app_config.image_root).join(&query.path);

  let images: Vec<ImageAttrs> = read_dir(path)
    .map_err(|err| {
      match err.status_code() {
        StatusCode::NOT_FOUND => AppHttpError::not_found("directory not found"),
        _ => AppHttpError::internal("error while reading images dir")
      }
    })?
    .map(|dir_entry| {
      let dir_entry = dir_entry.unwrap();

      ImageAttrs {
        name: dir_entry.file_name().into_string().unwrap()
      }
    })
    .collect();

  Ok(HttpResponse::Ok().json(&images))
}
