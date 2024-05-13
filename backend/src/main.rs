mod app_config;
mod utils;
mod routes;
mod model;
mod user_source;
mod data_source;
mod app_state;
mod service;

use tower_http::services::{ServeDir, ServeFile};
use std::sync::Arc;
use anyhow::Result;
use axum::Router;
use axum::routing::get;
use crate::app_config::AppConfig;
use crate::app_state::AppState;
use crate::service::tile_collection::TileCollectionService;
use crate::user_source::UserSource;

#[tokio::main]
async fn main() -> Result<()> {
  let app_config = AppConfig::read_from_env()?;
  app_config.init_logger();

  let app_config = Arc::new(app_config);

  // let user_source = user_source::StaticUserSource::from_csv_file("./misc/dev-users.csv").await?;

  let app_state = AppState {
    app_config: app_config.clone(),
    // user_source_service: Arc::new(Box::new(user_source)),
    tile_collection_service: TileCollectionService::from_config(&app_config),
  };

  let layer_builder = tower::ServiceBuilder::new();

  #[cfg(debug_assertions)]
    let layer_builder = layer_builder.layer(tower_http::trace::TraceLayer::new_for_http());

  let layer_builder = layer_builder.layer(app_config.cors_config());

  let app = Router::new()
    .route("/~:name", get(routes::redirect::tilda))
    .route("/@:name", get(routes::redirect::monkey))
    .nest("/api", routes::api::make_router())
    .route("/", get(routes::index::serve))
    .nest_service("/img", ServeDir::new(&app_config.images_root))
    .fallback_service(ServeDir::new(&app_config.resources_root))
    .layer(layer_builder)
    .with_state(app_state)
    ;

  let listener = tokio::net::TcpListener::bind(app_config.bind()).await.unwrap();
  axum::serve(listener, app).await?;

  Ok(())
}

