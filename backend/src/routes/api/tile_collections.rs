use axum::extract::{Path, Query, State};
use axum::Json;
use crate::utils::problem_details::{HttpResult, JsonResult};
use serde::Deserialize;
use crate::data_source::{RepositoryError};
use crate::model::app_user::AppUser;
use crate::utils::problem_details::ProblemDetails;
use crate::model::tile_collection::TileCollection;
use crate::service::tile_collection::TileCollectionService;


#[derive(Debug, Deserialize)]
pub struct GetIconCollectionQuery {
  #[serde(alias = "recursiveMerge", alias = "recursive-merge")]
  recursive_merge: Option<bool>,
}

pub async fn search(
  _: AppUser, // only for auth
  State(tile_repo): State<TileCollectionService>,
) -> JsonResult<Vec<String>> {
  let names = tile_repo.get_all_names().await
    .map_err(|_err| ProblemDetails::internal(""))?;

  Ok(Json(names))
}


pub async fn select(
  tile_repo: State<TileCollectionService>,
  name: Path<String>,
  query: Query<GetIconCollectionQuery>,
) -> JsonResult<TileCollection> {
  let mut tile_collection = match tile_repo.get_one(&name).await {
    Ok(tc) => tc,
    Err(RepositoryError::NotFound) => return Err(ProblemDetails::not_found("not found")),
    Err(_) => return Err(ProblemDetails::internal("")),
  };

  if Some(true) == query.recursive_merge {
    tile_collection = tile_repo.resolve_recursive(&tile_collection).await
      .map_err(|_err| ProblemDetails::internal("error while resolve recursive"))?;
  }

  tile_repo.normalize(&mut tile_collection);

  return Ok(Json(tile_collection));
}

pub async fn update(
  _: AppUser,
  Path(id): Path<String>,
  tile_collection: Json<TileCollection>,
) -> HttpResult<String> {
  println!("{} = {:?}", id, tile_collection);

  Ok("ok".to_string())
}
