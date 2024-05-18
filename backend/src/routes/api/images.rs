use std::fs::read_dir;
use std::path::Path;
use axum::extract::{Query, State};
use axum::Json;
use crate::utils::problem_details::{JsonResult, ProblemDetails};
use serde::Deserialize;
use crate::model::image_attrs::ImageAttrs;
use crate::service::app_config::AppConfigBean;
use crate::utils::security::assert_path_not_backwards;


#[derive(Deserialize)]
pub struct SearchQuery {
  path: String,
}

pub async fn search(
    app_config: State<AppConfigBean>,
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
