use std::path::PathBuf;
use axum::extract::State;
use axum::response::{Html, IntoResponse};
use tokio::fs;
use crate::service::app_config::AppConfigBean;

pub async fn viewer(app_config: State<AppConfigBean>) -> impl IntoResponse {
  let viewer_html = fs::read_to_string(
    PathBuf::new().join(&app_config.resources_root).join("viewer.html"))
    .await.unwrap();

  return Html(viewer_html);
}

pub async fn editor(app_config: State<AppConfigBean>) -> impl IntoResponse {
  let editor_html = fs::read_to_string(
    PathBuf::new().join(&app_config.resources_root).join("editor.html"))
    .await.unwrap();

  return Html(editor_html);
}
