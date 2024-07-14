mod utils;
mod routes;
mod model;
mod data_source;
mod app_state;
mod service;

use tower_http::services::{ServeDir, ServeFile};
use anyhow::Result;
use axum::Router;
use axum::routing::get;
use crate::service::app_config::{AppConfig, AppConfigBean};
use crate::app_state::AppState;
use crate::service::tile_collection::{TilesCollections};
use crate::service::user_source;

#[tokio::main]
async fn main() -> Result<()> {
  let app_config = AppConfig::from_env()?;
  app_config.init_logger();
  let app_config: AppConfigBean = app_config.into();

  let user_source = user_source::from_config(&app_config)?;

  let app_state = AppState {
    app_config: app_config.clone(),
    user_source_service: user_source,
    tile_collection_service: TilesCollections::new(&app_config).into(),
  };

  let layer_builder = tower::ServiceBuilder::new();

  #[cfg(debug_assertions)]
    let layer_builder = layer_builder.layer(tower_http::trace::TraceLayer::new_for_http());

  let layer_builder = layer_builder.layer(app_config.cors_config());

  let app = Router::new()
    .route("/~:name", get(routes::redirect::tilda))
    .route("/@:name", get(routes::redirect::monkey))
    .nest("/api", routes::api::make_router())
    .route("/", get(routes::frontend::viewer))
    .route("/editor", get(routes::frontend::editor))
    .nest_service("/img", ServeDir::new(&app_config.images_root))
    .fallback_service(ServeDir::new(&app_config.resources_root))
    .layer(layer_builder)
    .with_state(app_state)
    ;

  let listener = tokio::net::TcpListener::bind(app_config.bind()).await.unwrap();
  axum::serve(listener, app).await?;

  Ok(())
}

