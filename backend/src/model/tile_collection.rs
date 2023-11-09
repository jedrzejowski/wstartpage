use std::collections::{HashSet, VecDeque};
use serde::{Deserialize, Serialize};
use anyhow::{anyhow, Result};
use crate::app_config::AppConfig;
use crate::data_source::DataSourceService;

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TextIcon {
  text: String,
  #[serde(rename = "bgColor")]
  bg_color: String,
  #[serde(rename = "fontSize")]
  font_size: i32,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
#[serde(untagged)]
pub enum Icon {
  ImageIcon(String),
  TextIcon(TextIcon),
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Tile {
  title: Option<String>,
  icon: Option<Icon>,
  url: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct TileSection {
  title: String,
  width: Option<i32>,
  #[serde(alias = "widgets")]
  tiles: Vec<Tile>,
  #[serde(default = "default_icon_section_order")]
  order: i32,
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

fn normalize_container(container: &mut Option<Vec<TileSection>>) {
  if let Some(sections) = container {
    for section in sections.into_iter() {
      for tile in section.tiles.iter_mut() {
        if let Some(icon) = &tile.icon {
          match icon {
            Icon::ImageIcon(icon) => {
              if icon.chars().nth(0).unwrap() == '!' {
                let mut text_icon = TextIcon {
                  text: String::from(""),
                  bg_color: String::from(""),
                  font_size: 16,
                };

                for part in icon[1..].split('&') {
                  let split: Vec<&str> = part.split('=').collect();

                  if split.len() == 2 {
                    match split[0] {
                      "text" => { text_icon.text = String::from(split[1]); }
                      "bgColor" => { text_icon.bg_color = String::from(split[1]); }
                      "fontSize" => { text_icon.font_size = split[1].parse().unwrap(); }
                      _ => {}
                    }
                  }
                }

                tile.icon = Some(Icon::TextIcon(text_icon));
              }
            }
            Icon::TextIcon(_) => {}
          }
        }
      }
    }
  }
}

impl TileCollection {
  pub fn normalize(tile_collection: &mut TileCollection) {
    normalize_container(&mut tile_collection.top);
    normalize_container(&mut tile_collection.middle);
    normalize_container(&mut tile_collection.right);
    normalize_container(&mut tile_collection.left);
    normalize_container(&mut tile_collection.bottom);
  }

  pub fn merge(name: String, tile_collections: &[TileCollection]) -> TileCollection {
    let first = &tile_collections[0];

    return TileCollection {
      name,
      includes: None,
      settings: first.settings.clone(),
      top: Some(tile_collections.into_iter()
        .map(|ic| &ic.top)
        .filter(|opt| opt.is_some())
        .flatten().flatten().map(|sec| sec.clone()).collect()),
      middle: Some(tile_collections.into_iter()
        .map(|ic| &ic.middle)
        .filter(|opt| opt.is_some())
        .flatten().flatten().map(|sec| sec.clone()).collect()),
      right: Some(tile_collections.into_iter()
        .map(|ic| &ic.right)
        .filter(|opt| opt.is_some())
        .flatten().flatten().map(|sec| sec.clone()).collect()),
      left: Some(tile_collections.into_iter()
        .map(|ic| &ic.left)
        .filter(|opt| opt.is_some())
        .flatten().flatten().map(|sec| sec.clone()).collect()),
      bottom: Some(tile_collections.into_iter()
        .map(|ic| &ic.bottom)
        .filter(|opt| opt.is_some())
        .flatten().flatten().map(|sec| sec.clone()).collect()),
    };
  }

  pub async fn resolve_recursive(&self, data_source: &DataSourceService) -> Result<Self> {
    let mut names_done = HashSet::new();
    let mut names_todo = match &self.includes {
      Some(names) => {
        if names.is_empty() {
          return Ok(self.clone());
        }

        VecDeque::from(names.to_vec())
      }
      None => VecDeque::new(),
    };
    let mut tile_collections: Vec<Self> = vec![self.clone()];
    names_done.insert(self.name.to_string());

    while !names_todo.is_empty() {
      let name = names_todo.pop_front().unwrap();

      if names_done.contains(&name) {
        continue;
      }

      let icon_collection = data_source.get_tile_collection(&name).await
        .map_err(|_| anyhow!("collection {} not found", &name))?;

      if let Some(includes) = &icon_collection.includes {
        for name in includes { names_todo.push_front(name.to_string()) }
      }

      tile_collections.push(icon_collection)
    }

    return Ok(Self::merge(
      format!("{}?recursiveMerged", &self.name),
      &tile_collections,
    ));
  }
}


