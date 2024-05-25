use std::collections::{HashSet, VecDeque};
use std::sync::Arc;
use anyhow::{anyhow, Result};
use crate::data_source::{FileDataSource, RepositoryResult};
use crate::model::tile_collection::{Icon, TileCollection, TileCollectionTheme, TileSection};
use crate::service::app_config::AppConfigBean;

pub type TilesCollectionsBean = Arc<TilesCollections>;

pub struct TilesCollections {
  data_source: FileDataSource<TileCollection>,
}

impl TilesCollections {
  pub fn new(app_config: &AppConfigBean) -> Self {
    Self {
      data_source: FileDataSource::from_path(&app_config.tile_collections_root),
    }
  }

  pub fn normalize(&self, tile_collection: &mut TileCollection) {
    if None == tile_collection.theme {
      tile_collection.theme = Some(TileCollectionTheme::SystemDefault);
    }

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
      theme: first.theme.clone(),
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
    let new_name = format!("{}?recursiveMerged", &tile_collection.name);
    let mut names_done = HashSet::new();
    let mut names_todo = match &tile_collection.includes {
      Some(names) => {
        if names.is_empty() {
          let mut tile_collection = tile_collection.clone();
          tile_collection.name = new_name;
          return Ok(tile_collection);
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

      let icon_collection = self.data_source.get_one(&name).await
        .map_err(|_| anyhow!("collection {} not found", &name))?;

      if let Some(includes) = &icon_collection.includes {
        for name in includes { names_todo.push_front(name.to_string()) }
      }

      tile_collections.push(icon_collection)
    }

    return Ok(Self::merge(
      new_name,
      &tile_collections,
    ));
  }

  pub async fn get_all_names(&self) -> RepositoryResult<Vec<String>> {
    self.data_source.get_all_names().await
  }

  pub async fn get_one(&self, name: &str) -> RepositoryResult<TileCollection> {
    self.data_source.get_one(name).await
  }

  pub async fn update_one(&self, name: &str, tile_collection: &TileCollection) -> RepositoryResult<()> {
    self.data_source.update_one(name, tile_collection).await
  }
}

fn normalize_container(container: &mut Option<Vec<TileSection>>) {
  if let Some(sections) = container {
    for section in sections {
      for tile in &mut section.tiles {
        match &tile.icon {
          Some(Icon::Legacy(icon)) => {
            if icon.chars().nth(0).unwrap() == '!' {
              let mut text = String::from("");
              let mut bg_color = String::from("");
              let mut font_size = 16;

              for part in icon[1..].split('&') {
                let split: Vec<&str> = part.split('=').collect();

                if split.len() == 2 {
                  match split[0] {
                    "text" => { text = String::from(split[1]); }
                    "bgColor" => { bg_color = String::from(split[1]); }
                    "fontSize" => { font_size = split[1].parse().unwrap(); }
                    _ => {}
                  }
                }
              }

              tile.icon = Some(Icon::TextIcon { text, bg_color, font_size });
            } else {
              tile.icon = Some(Icon::UrlIcon { url: icon.to_owned() });
            }
          }
          _ => {}
        }
      }
    }
  }
}
