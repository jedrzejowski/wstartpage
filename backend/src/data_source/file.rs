use std::path::{Path, PathBuf};
use async_trait::async_trait;
use crate::data_source::{DataSource, DataSourceError};
use crate::model::tile_collection::TileCollection;

#[derive(Debug)]
pub struct FileDataSource {
  base_path: PathBuf,
}

impl FileDataSource {
  pub fn from_path(base_path: impl AsRef<Path>) -> Self {
    Self { base_path: base_path.as_ref().to_path_buf() }
  }
}

#[async_trait]
impl DataSource for FileDataSource {
  async fn get_tile_collection(&self, name: &str) -> Result<TileCollection, DataSourceError> {
    let mut yaml_path = self.base_path.clone();
    yaml_path.push(name);
    yaml_path.set_extension("yml");

    let file = match std::fs::File::open(yaml_path) {
      Ok(file) => file,
      Err(_) => return Err(DataSourceError::NotFound),
    };

    let mut json: serde_yaml::Mapping = match serde_yaml::from_reader(file) {
      Ok(json) => json,
      Err(err) => return Err(DataSourceError::Anyhow(err.into())),
    };

    json.insert(
      serde_yaml::Value::String("name".to_string()),
      serde_yaml::Value::String(name.to_string()),
    );

    let mut tc = match serde_yaml::from_value(serde_yaml::Value::Mapping(json)) {
      Ok(tc) => tc,
      Err(err) => return Err(DataSourceError::Anyhow(err.into())),
    };

    TileCollection::normalize(&mut tc);

    return Ok(tc);
  }

  async fn get_tile_collection_names(&self) -> Result<Vec<String>, DataSourceError> {
    let read_dir = match std::fs::read_dir(&self.base_path) {
      Ok(read_dir) => read_dir,
      Err(err) => return Err(DataSourceError::Anyhow(err.into())),
    };

    Ok(read_dir.flatten().filter(|dir_entry| {
      dir_entry.file_type().unwrap().is_file()
    }).map(|dir_entry| {
      dir_entry.path()
    }).filter(|path| {
      match path.extension().unwrap().to_str().unwrap() {
        "yml" => true,
        "yaml" => true,
        _ => false,
      }
    }).map(|path| {
      path.file_stem().unwrap().to_str().unwrap().to_string()
    }).collect())
  }

  async fn update_tile_collection(&self, name: &str, tl: TileCollection) -> Result<(), DataSourceError> {
    todo!()
  }
}
