use axum::extract::{Path, Query, State};
use axum::Json;
use crate::utils::problem_details::{HttpResult, JsonResult};
use serde::Deserialize;
use crate::data_source::{RepositoryError};
use crate::model::user_info::AppUserInfo;
use crate::utils::problem_details::ProblemDetails;
use crate::model::tile_collection::TileCollection;
use crate::service::tile_collection::TilesCollectionsBean;


#[derive(Debug, Deserialize)]
pub struct GetIconCollectionQuery {
  #[serde(alias = "recursiveMerge", alias = "recursive-merge")]
  recursive_merge: Option<bool>,
}

pub async fn search(
  _: AppUserInfo, // only for auth
  State(tile_repo): State<TilesCollectionsBean>,
) -> JsonResult<Vec<String>> {
  let names = tile_repo.get_all_names().await
    .map_err(|_err| ProblemDetails::internal(""))?;

  Ok(Json(names))
}


pub async fn select(
  tile_repo: State<TilesCollectionsBean>,
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
  _: AppUserInfo,
  tile_repo: State<TilesCollectionsBean>,
  Path(id): Path<String>,
  tile_collection: Json<TileCollection>,
) -> HttpResult<()> {

  tile_repo.update_one(&id, &tile_collection).await?;

  Ok(())
}
