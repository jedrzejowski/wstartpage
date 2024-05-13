use std::path::PathBuf;
use std::sync::Arc;
use axum::extract::State;
use axum::response::{Html, IntoResponse};
use tokio::fs;
use crate::app_config::AppConfig;

pub async fn serve(app_config: State<Arc<AppConfig>>) -> impl IntoResponse {
  let viewer_html = fs::read_to_string(
    PathBuf::new().join(&app_config.resources_root).join("viewer.html"))
    .await.unwrap();

  return Html(viewer_html);
}
