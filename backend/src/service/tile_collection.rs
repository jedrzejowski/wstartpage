use std::collections::{HashSet, VecDeque};
use std::ops::Deref;
use std::sync::Arc;
use anyhow::{anyhow, Result};
use axum::extract::FromRef;
use crate::app_config::AppConfig;
use crate::data_source::{FileDataSource, RepositoryResult};
use crate::model::tile_collection::{Icon, TextIcon, TileCollection, TileSection};

#[derive(Clone)]
pub struct TileCollectionService(Arc<Inner>);

impl TileCollectionService {
  pub fn from_config(app_config: &AppConfig) -> TileCollectionService {
    TileCollectionService(Arc::new(Inner {
      file_data_source: FileDataSource::from_path(&app_config.tile_collections_root),
    }))
  }
}

impl Deref for TileCollectionService {
  type Target = Inner;

  fn deref(&self) -> &Self::Target {
    &self.0
  }
}

pub struct Inner {
  file_data_source: FileDataSource<TileCollection>,
}

impl Inner {
  pub fn normalize(&self, tile_collection: &mut TileCollection) {
    normalize_container(&mut tile_collection.top);
    normalize_container(&mut tile_collection.middle);
    normalize_container(&mut tile_collection.right);
    normalize_container(&mut tile_collection.left);
    normalize_container(&mut tile_collection.bottom);
  }

  fn merge(name: String, tile_collections: &[TileCollection]) -> TileCollection {
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

  pub async fn resolve_recursive(&self, tile_collection: &TileCollection) -> Result<TileCollection> {
    let mut names_done = HashSet::new();
    let mut names_todo = match &tile_collection.includes {
      Some(names) => {
        if names.is_empty() {
          return Ok(tile_collection.clone());
        }

        VecDeque::from(names.to_vec())
      }
      None => VecDeque::new(),
    };

    let mut tile_collections: Vec<TileCollection> = vec![tile_collection.clone()];
    names_done.insert(tile_collection.name.to_string());

    while !names_todo.is_empty() {
      let name = names_todo.pop_front().unwrap();

      if names_done.contains(&name) {
        continue;
      }

      let icon_collection = self.file_data_source.get_one(&name).await
        .map_err(|_| anyhow!("collection {} not found", &name))?;

      if let Some(includes) = &icon_collection.includes {
        for name in includes { names_todo.push_front(name.to_string()) }
      }

      tile_collections.push(icon_collection)
    }

    return Ok(Self::merge(
      format!("{}?recursiveMerged", &tile_collection.name),
      &tile_collections,
    ));
  }

  pub async fn get_all_names(&self) -> RepositoryResult<Vec<String>> {
    self.file_data_source.get_all_names().await
  }

  pub async fn get_one(&self, name: &str) -> RepositoryResult<TileCollection> {
    self.file_data_source.get_one(name).await
  }
}

fn normalize_container(container: &mut Option<Vec<TileSection>>) {
  if let Some(sections) = container {
    for section in sections {
      for tile in &mut section.tiles {
        match &tile.icon {
          Some(Icon::ImageIcon(icon)) => {
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
          _ => {}
        }
      }
    }
  }
}
