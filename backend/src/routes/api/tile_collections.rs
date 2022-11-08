use actix_web::{Error, web, HttpResponse, get, put};
use crate::util::http::AppHttpResult;
use serde::Deserialize;
use crate::app_config;
use std::vec::Vec;
use crate::data::auth::AppUser;
use crate::util::http::AppHttpError;
use crate::data::tile_collection::TileCollection;


#[derive(Debug, Deserialize)]
pub struct GetIconCollectionQuery {
  #[serde(alias = "recursiveMerge", alias = "recursive-merge")]
  recursive_merge: Option<bool>,
}

pub async fn select(params: web::Path<String>, query: web::Query<GetIconCollectionQuery>) -> AppHttpResult {
  let name = params.into_inner();

  let icon_collection = TileCollection::get_by_name(&name)
    .map_err(|err| AppHttpError::internal(err.to_string()))?
    .ok_or(AppHttpError::not_found("not found"))?;

  if let Some(true) = query.recursive_merge {

    let icon_collection = icon_collection.resolve_recursive()
      .map_err(|_err| AppHttpError::internal("error while resolve recursive"))?;

    return Ok(HttpResponse::Ok().json(icon_collection));
  }

  return Ok(HttpResponse::Ok().json(icon_collection));
}

pub async fn update(
  auth_user: AppUser,
  params: web::Path<String>,
  icon_collection: web::Json<TileCollection>,
) -> Result<HttpResponse, Error> {
  let id = params.into_inner();

  println!("{} = {:?}", id, icon_collection);

  return Ok(HttpResponse::Ok().body("ok"));
}


pub async fn search() -> Result<HttpResponse, Error> {
  let paths = std::fs::read_dir(app_config::app_config.dashboard_root.as_str())?;

  let names: Vec<String> = paths.flatten().filter(|dir_entry| {
    dir_entry.file_type().unwrap().is_file()
  }).map(|dir_entry| {
    dir_entry.path()
  }).filter(|path| {
    match path.extension().unwrap().to_str().unwrap() {
      "yml" => true,
      "yaml" => true,
      _ => false,
    }
  }).map(|path| {
    path.file_stem().unwrap().to_str().unwrap().to_string()
  }).collect();

  Ok(HttpResponse::Ok().json(names))
}
