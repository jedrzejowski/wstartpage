use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TextIcon {
  pub text: String,
  #[serde(rename = "bgColor")]
  pub bg_color: String,
  #[serde(rename = "fontSize")]
  pub font_size: i32,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
#[serde(untagged)]
pub enum Icon {
  ImageIcon(String),
  TextIcon(TextIcon),
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Tile {
  pub title: Option<String>,
  pub icon: Option<Icon>,
  pub url: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TileSection {
  pub title: String,
  pub width: Option<i32>,
  #[serde(alias = "widgets")]
  pub tiles: Vec<Tile>,
  #[serde(default = "default_icon_section_order")]
  pub order: i32,
}

fn default_icon_section_order() -> i32 {
  return 1000;
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TileCollection {
  pub name: String,

  pub includes: Option<Vec<String>>,
  pub settings: Option<CollectionSettings>,

  pub top: Option<Vec<TileSection>>,
  pub middle: Option<Vec<TileSection>>,
  pub right: Option<Vec<TileSection>>,
  pub left: Option<Vec<TileSection>>,
  pub bottom: Option<Vec<TileSection>>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct CollectionSettings {
  #[serde(skip_serializing_if = "Option::is_none", rename = "logoUrl", alias = "logo-url", alias = "logo_url")]
  logo_url: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none", rename = "backgroundUrl", alias = "background-url", alias = "background_url")]
  background_url: Option<String>,
  #[serde(skip_serializing_if = "Option::is_none", rename = "darkMode", alias = "dark-mode", alias = "dark_mode")]
  dark_mode: Option<bool>,
  #[serde(skip_serializing_if = "Option::is_none", rename = "showTitles", alias = "show-titles", alias = "show_titles")]
  show_titles: Option<bool>,
  #[serde(skip_serializing_if = "Option::is_none", rename = "zoomLevel", alias = "zoom-level", alias = "zoom_level")]
  zoom_level: Option<u32>,
}

