use std::path::Path;
use axum::extract::{Query, State};
use axum::Json;
use normalize_path::NormalizePath;
use crate::utils::problem_details::{JsonResult, ProblemDetails};
use serde::{Deserialize, Serialize};
use crate::model::user_info::AppUserInfo;
use crate::service::app_config::AppConfigBean;
use crate::utils::security::assert_path_not_backwards;

#[derive(Deserialize)]
pub struct SearchQuery {
  path: String,
  query: Option<String>,
}

#[derive(Deserialize, Serialize)]
#[serde(tag = "type")]
pub enum Inode {
  #[serde(rename = "dir")]
  Directory {
    name: String,
    #[serde(rename = "fullPath")]
    full_path: String,
    children: Option<Vec<Inode>>,
  },
  #[serde(rename = "file")]
  File {
    name: String,
    #[serde(rename = "fullPath")]
    full_path: String,
  },
}


pub async fn search(
  _: AppUserInfo, // only for auth
  app_config: State<AppConfigBean>,
  query: Query<SearchQuery>,
) -> JsonResult<Vec<Inode>> {
  let path = format!("./{}", &query.path);
  assert_path_not_backwards(&path)?;
  let path = Path::new(&app_config.images_root).join(path).normalize();

  let read_dir = std::fs::read_dir(path).map_err(|err| {
    ProblemDetails::not_found("directory not found")
  })?;

  let mut inodes = vec![];

  for entry in read_dir {
    let entry = entry?;
    let file_type = entry.file_type()?;

    let full_path = entry.path();
    let full_path = full_path.to_str();
    let full_path = match full_path {
      None => continue,
      Some(some) => &some[app_config.images_root.len()..],
    };

    let full_path = if full_path.starts_with('/') {
      &full_path[1..]
    } else { &full_path };

    if file_type.is_file() {
      inodes.push(Inode::File {
        name: entry.file_name().into_string().unwrap(),
        full_path: full_path.to_string(),
      });
      continue;
    }

    if file_type.is_dir() {
      inodes.push(Inode::Directory {
        name: entry.file_name().into_string().unwrap(),
        full_path: full_path.to_string(),
        children: None,
      });
      continue;
    }
  }

  Ok(Json(inodes))
}
