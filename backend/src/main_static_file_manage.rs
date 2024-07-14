mod utils;
mod routes;
mod model;
mod data_source;
mod app_state;
mod service;

use anyhow::Result;
use crate::service::app_config::{AppConfig, AppConfigBean};


#[tokio::main]
async fn main() -> Result<()> {
  let app_config = AppConfig::from_env()?;
  app_config.init_logger();

  let app_config: AppConfigBean = app_config.into();


  Ok(())
}

