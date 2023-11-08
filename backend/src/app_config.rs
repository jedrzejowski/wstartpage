use anyhow::{anyhow, Context, Result};
use serde::Deserialize;

fn make_absolute(path: &mut String) {
  let os_path = std::path::Path::new(path);

  let full_path = std::fs::canonicalize(os_path)
    .map_err(|err| anyhow!("directory '{}' not found", path))
    .unwrap().into_os_string().into_string().unwrap();

  path.replace_range(.., &full_path);
}

#[derive(Deserialize, Debug)]
pub struct AppConfig {
  pub server_host: String,
  pub server_port: u16,

  pub viewer_root: String,
  pub editor_root: String,
  pub dashboard_root: String,
  pub image_root: String,
}

impl AppConfig {
  pub fn bind(&self) -> impl std::net::ToSocketAddrs {
    format!("{}:{}", self.server_host, self.server_port)
  }

  pub fn init_logger(&self) {
    use log::LevelFilter;

    let mut builder = env_logger::builder();
    builder.filter_level(LevelFilter::Info);
    builder.init();
  }

  pub fn read_from_env() -> Result<Self> {
    dotenv::dotenv().ok();

    const PREFIX: &str = "WSTARTPAGE_";
    let mut config: Self = match envy::prefixed("WSTARTPAGE_").from_env() {
      Err(envy::Error::MissingValue(value)) => return Err(anyhow!("missing var {}{}", PREFIX, value.to_uppercase())),
      other => other,
    }?;

    make_absolute(&mut config.viewer_root);
    make_absolute(&mut config.editor_root);
    make_absolute(&mut config.dashboard_root);
    make_absolute(&mut config.image_root);

    Ok(config)
  }
}
