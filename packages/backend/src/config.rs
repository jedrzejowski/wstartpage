use once_cell::sync::Lazy;
use serde::Deserialize;

fn make_absolute(path: &mut String) -> String {
    let q = std::path::Path::new(path);
    return std::fs::canonicalize(q).unwrap().to_str().unwrap().parse().unwrap();
}

fn default_host() -> String {
    String::from("0.0.0.0")
}

fn default_port() -> u16 {
    8080
}

#[derive(Deserialize, Debug)]
pub struct Config {
    #[serde(default = "default_host")]
    pub host: String,
    #[serde(default = "default_port")]
    pub port: u16,
    pub static_root: String,
    pub dashboard_root: String,
    pub image_root: String,
}

impl Config {
    pub fn app_bind(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}

#[allow(non_upper_case_globals)]
pub static cfg: Lazy<Config> = Lazy::new(|| {
    let mut config = envy::prefixed("WSTARTPAGE_").from_env::<Config>().unwrap();

    make_absolute(&mut config.static_root);
    make_absolute(&mut config.dashboard_root);
    make_absolute(&mut config.image_root);

    return config;
});
