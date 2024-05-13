use std::fs::read_dir;
use std::path::Path;
use std::sync::Arc;
use axum::extract::{Query, State};
use axum::Json;
use axum::response::IntoResponse;
use http::StatusCode;
use crate::utils::problem_details::{HttpResult, JsonResult, ProblemDetails};
use serde::Deserialize;
use crate::app_config::AppConfig;
use crate::model::image_attrs::ImageAttrs;
use crate::utils::security::assert_path_not_backwards;


#[derive(Deserialize)]
pub struct SearchQuery {
  path: String,
}

pub async fn search(
  State(app_config): State<Arc<AppConfig>>,
  Query(query): Query<SearchQuery>,
) -> JsonResult<Vec<ImageAttrs>> {
  assert_path_not_backwards(&query.path)?;

  let path = Path::new(&app_config.images_root).join(&query.path);

  let images: Vec<ImageAttrs> = read_dir(path)
    .map_err(|err| {
      ProblemDetails::not_found("directory not found")
    })?
    .map(|dir_entry| {
      let dir_entry = dir_entry.unwrap();

      ImageAttrs {
        name: dir_entry.file_name().into_string().unwrap()
      }
    })
    .collect();

  Ok(Json(images))
}
