use actix_web::{Error, web, HttpResponse};
use crate::utils::http::AppHttpResult;
use serde::Deserialize;
use crate::data_source::{DataSourceError, DataSourceService};
use crate::model::app_user::AppUser;
use crate::utils::http::AppHttpError;
use crate::model::tile_collection::TileCollection;


#[derive(Debug, Deserialize)]
pub struct GetIconCollectionQuery {
  #[serde(alias = "recursiveMerge", alias = "recursive-merge")]
  recursive_merge: Option<bool>,
}

#[actix_web::get("/{name}")]
pub async fn select(
  data_source: DataSourceService,
  params: web::Path<String>,
  query: web::Query<GetIconCollectionQuery>,
) -> AppHttpResult {
  let name = params.into_inner();

  let tc = match data_source.get_tile_collection(&name).await {
    Ok(tc) => tc,
    Err(DataSourceError::NotFound) => return Err(AppHttpError::not_found("not found")),
    Err(_) => return Err(AppHttpError::internal(())),
  };

  if let Some(true) = query.recursive_merge {
    let tile_collection = tc.resolve_recursive(&data_source).await
      .map_err(|_err| AppHttpError::internal("error while resolve recursive"))?;

    return Ok(HttpResponse::Ok().json(tile_collection));
  }

  return Ok(HttpResponse::Ok().json(tc));
}

#[actix_web::put("/{name}")]
pub async fn update(
  _: AppUser,
  params: web::Path<String>,
  tile_collection: web::Json<TileCollection>,
) -> Result<HttpResponse, Error> {
  let id = params.into_inner();

  println!("{} = {:?}", id, tile_collection);

  return Ok(HttpResponse::Ok().body("ok"));
}


#[actix_web::get("/")]
pub async fn search(
  _: AppUser, // only for auth
  data_source: DataSourceService,
) -> Result<HttpResponse, Error> {
  let names = data_source.get_tile_collection_names().await
    .map_err(|_err| AppHttpError::internal(()))?;

  Ok(HttpResponse::Ok().json(names))
}
