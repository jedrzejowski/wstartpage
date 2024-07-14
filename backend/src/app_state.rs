use axum::extract::FromRef;
use crate::service::app_config::AppConfigBean;
use crate::service::tile_collection::TilesCollectionsBean;
use crate::service::user_source::UserSourceBean;

#[derive(FromRef, Clone)]
pub struct AppState {
  pub app_config: AppConfigBean,
  pub user_source_service: UserSourceBean,
  pub tile_collection_service: TilesCollectionsBean,
}

