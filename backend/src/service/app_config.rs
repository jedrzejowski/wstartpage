use std::env::VarError;
use std::sync::Arc;
use std::time::Duration;
use anyhow::{anyhow, Result};
use http::Method;
use serde::Deserialize;
use tower_http::cors::CorsLayer;

pub type AppConfigBean = Arc<AppConfig>;

#[derive(Deserialize, Debug)]
pub struct AppConfig {
  pub server_host: Option<String>,
  pub server_port: Option<u16>,

  pub resources_root: String,
  pub tile_collections_root: String,
  pub images_root: String,
}

impl AppConfig {
  pub fn bind(&self) -> impl tokio::net::ToSocketAddrs {
    let server_host = match &self.server_host {
      Some(val) => val.clone(),
      None => "127.0.0.1".to_string(),
    };

    let server_port = match &self.server_port {
      Some(val) => *val,
      None => 8080,
    };

    (server_host, server_port)
  }

  pub fn init_logger(&self) {
    use log::LevelFilter;

    let mut builder = env_logger::builder();
    builder.filter_level(LevelFilter::Debug);
    builder.init();
  }

  pub fn from_env() -> Result<Self> {
    dotenv::dotenv().ok();

    let mut config: Self = match envy::from_env() {
      Err(envy::Error::MissingValue(value)) => return Err(anyhow!("missing env var {}", value.to_uppercase())),
      other => other,
    }?;

    make_absolute(&mut config.resources_root);
    make_absolute(&mut config.tile_collections_root);
    make_absolute(&mut config.images_root);

    dbg!(&config);
    Ok(config)
  }

  pub fn cors_config(&self) -> CorsLayer {
    if cfg!(debug_assertions) {
      return CorsLayer::permissive();
    }

    let mut cors = CorsLayer::new()
      .allow_methods([Method::GET, Method::POST])
      .allow_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT, http::header::CONTENT_TYPE])
      .max_age(Duration::from_secs(3600));
    //
    // .allowed_origin("https://www.rust-lang.org/")
    // .allowed_origin_fn(|origin, _req_head| {
    //   origin.as_bytes().ends_with(b".rust-lang.org")
    // })

    return cors;
  }

  pub fn prefixed_reader(&self, prefix: &str) -> ConfigReader {
    return ConfigReader { prefix: prefix.to_string() };
  }
}

fn make_absolute(path: &mut String) {
  let os_path = std::path::Path::new(path);

  let full_path = std::fs::canonicalize(os_path)
    .map_err(|err| anyhow!("directory '{}' not found", path))
    .unwrap().into_os_string().into_string().unwrap();

  path.replace_range(.., &full_path);
}

pub struct ConfigReader {
  prefix: String,
}

impl ConfigReader {
  pub fn prefixed(&self, prefix: &str) -> ConfigReader {
    return ConfigReader { prefix: format!("{}_{}", self.prefix, prefix) };
  }

  pub fn get_optional(&self, key: &str) -> Option<String> {
    let var_name = format!("{}_{}", self.prefix, key).to_uppercase();

    match std::env::var(&var_name) {
      Ok(var) => Some(var),
      Err(_) => None,
    }
  }

  pub fn get_required(&self, key: &str) -> String {
    let var_name = format!("{}_{}", self.prefix, key).to_uppercase();
    let var_value = match std::env::var(&var_name) {
      Ok(var) => var,
      Err(_) => panic!("required var not found {}", var_name),
    };

    return var_value;
  }
}
