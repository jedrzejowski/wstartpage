use axum::extract::FromRef;
use crate::service::app_config::AppConfigService;
use crate::service::tile_collection::TileCollectionService;
use crate::service::user_source::UserSourceService;

#[derive(FromRef, Clone)]
pub struct AppState {
  pub app_config: AppConfigService,
  pub user_source_service: UserSourceService,
  pub tile_collection_service: TileCollectionService,
}

