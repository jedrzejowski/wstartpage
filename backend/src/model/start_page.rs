use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct StartPage {
  pub name: String,

  pub top: Option<Vec<String>>,
  pub middle: Option<Vec<String>>,
  pub right: Option<Vec<String>>,
  pub left: Option<Vec<String>>,
  pub bottom: Option<Vec<String>>,
}

// #[derive(Deserialize, Serialize, Debug, Clone, Eq, PartialEq)]
// pub enum TileCollectionTheme {
//   #[serde(rename = "SYSTEM_DEFAULT")]
//   SystemDefault,
//   #[serde(rename = "LIGHT")]
//   Light,
//   #[serde(rename = "DARK")]
//   Dark,
// }
//
// #[derive(Deserialize, Serialize, Debug, Clone)]
// pub struct StartPageSettings {
//   #[serde(
//     skip_serializing_if = "Option::is_none",
//     rename = "logoUrl",
//     alias = "logo-url",
//     alias = "logo_url"
//   )]
//   logo_url: Option<String>,
//   #[serde(
//     skip_serializing_if = "Option::is_none",
//     rename = "backgroundUrl",
//     alias = "background-url",
//     alias = "background_url"
//   )]
//   background_url: Option<String>,
//   #[serde(
//     skip_serializing_if = "Option::is_none",
//     rename = "darkMode",
//     alias = "dark-mode",
//     alias = "dark_mode"
//   )]
//   dark_mode: Option<bool>,
//   #[serde(
//     skip_serializing_if = "Option::is_none",
//     rename = "showTitles",
//     alias = "show-titles",
//     alias = "show_titles"
//   )]
//   show_titles: Option<bool>,
//   #[serde(
//     skip_serializing_if = "Option::is_none",
//     rename = "zoomLevel",
//     alias = "zoom-level",
//     alias = "zoom_level"
//   )]
//   zoom_level: Option<u32>,
// }
