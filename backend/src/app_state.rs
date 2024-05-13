use std::sync::Arc;
use axum::extract::FromRef;
use crate::app_config::AppConfig;
use crate::service::tile_collection::TileCollectionService;
use crate::user_source::UserSourceService;

#[derive(Clone)]
pub struct AppState {
  pub app_config: Arc<AppConfig>,
  // pub user_source_service: UserSourceService,
  pub tile_collection_service: TileCollectionService,
}

// impl FromRef<AppState> for UserSourceService {
//   fn from_ref(app_state: &AppState) -> Self {
//     app_state.user_source_service.clone()
//   }
// }

impl FromRef<AppState> for TileCollectionService {
  fn from_ref(app_state: &AppState) -> Self {
    app_state.tile_collection_service.clone()
  }
}

impl FromRef<AppState> for Arc<AppConfig> {
  fn from_ref(app_state: &AppState) -> Self {
    app_state.app_config.clone()
  }
}
