use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
#[serde(untagged)]
pub enum Icon {
  Legacy(String),
  TextIcon {
    text: String,
    #[serde(rename = "bgColor")]
    bg_color: String,
    #[serde(rename = "fontSize")]
    font_size: i32,
  },
  UrlIcon {
    url: String,
  },
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Tile {
  pub title: Option<String>,
  pub icon: Option<Icon>,
  pub url: String,
  pub keywords: Option<Vec<String>>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TileCollection {
  pub title: String,
  #[serde(alias = "widgets")]
  pub tiles: Vec<Tile>,
}
