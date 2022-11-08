use anyhow::anyhow;
use once_cell::sync::Lazy;
use serde::Deserialize;

fn make_absolute(path: &mut String) {
  let os_path = std::path::Path::new(path);

  let full_path = std::fs::canonicalize(os_path)
    .map_err(|err| anyhow!("directory '{}' not found", path))
    .unwrap().into_os_string().into_string().unwrap();

  path.replace_range(.., &full_path);
}

fn default_host() -> String {
  String::from("0.0.0.0")
}

fn default_port() -> u16 {
  8080
}

#[derive(Deserialize, Debug)]
pub struct AppConfig {
  #[serde(default = "default_host")]
  pub host: String,
  #[serde(default = "default_port")]
  pub port: u16,
  pub viewer_root: String,
  pub editor_root: String,
  pub dashboard_root: String,
  pub image_root: String,
}

impl AppConfig {
  pub fn app_bind(&self) -> String {
    format!("{}:{}", self.host, self.port)
  }

  pub fn init_logger(&self) {
    use log::LevelFilter;

    let mut builder = env_logger::builder();
    builder.filter_level(LevelFilter::Info);
    builder.init();
  }
}

#[allow(non_upper_case_globals)]
pub static app_config: Lazy<AppConfig> = Lazy::new(|| {
  let mut config = envy::prefixed("WSTARTPAGE_").from_env::<AppConfig>().unwrap();

  make_absolute(&mut config.viewer_root);
  make_absolute(&mut config.editor_root);
  make_absolute(&mut config.dashboard_root);
  make_absolute(&mut config.image_root);

  return config;
});
