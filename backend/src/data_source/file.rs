use std::fmt::{Debug};
use std::marker::PhantomData;
use std::path::{Path, PathBuf};
use anyhow::{bail, Context};
use serde::{Deserialize, Serialize};
use tokio::fs;
use tokio::io::AsyncReadExt;
use crate::data_source::{RepositoryError};

#[derive(Debug)]
pub struct FileDataSource<T> {
  base_path: PathBuf,
  phantom_data: PhantomData<T>,
}

impl<T> FileDataSource<T> {
  pub fn from_path(base_path: impl AsRef<Path>) -> Self {
    Self {
      base_path: base_path.as_ref().to_path_buf(),
      phantom_data: PhantomData::default(),
    }
  }

  pub fn file_path_for_name(&self, name: &str) -> impl AsRef<Path> {
    let mut yaml_path = self.base_path.clone();
    yaml_path.push(name);
    yaml_path.set_extension("yml");
    return yaml_path;
  }
}

impl<T> FileDataSource<T>
  where T: for<'a> Deserialize<'a> + Serialize
{
  pub async fn get_one(&self, name: &str) -> Result<T, RepositoryError> {
    let yaml_path = self.file_path_for_name(name);

    let file = match fs::read_to_string(yaml_path).await {
      Ok(file) => file,
      Err(_) => return Err(RepositoryError::NotFound),
    };

    let mut json: serde_yaml::Mapping = match serde_yaml::from_str(file.as_str()) {
      Ok(json) => json,
      Err(err) => return Err(RepositoryError::Anyhow(err.into())),
    };

    json.insert(
      serde_yaml::Value::String("name".to_string()),
      serde_yaml::Value::String(name.to_string()),
    );

    let entity = match serde_yaml::from_value(serde_yaml::Value::Mapping(json)) {
      Ok(entity) => entity,
      Err(err) => return Err(RepositoryError::Anyhow(err.into())),
    };

    return Ok(entity);
  }

  pub async fn get_all_names(&self) -> Result<Vec<String>, RepositoryError> {
    let read_dir = match std::fs::read_dir(&self.base_path) {
      Ok(read_dir) => read_dir,
      Err(err) => return Err(RepositoryError::Anyhow(err.into())),
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

  pub async fn update_one(&self, name: &str, obj: &T) -> Result<(), RepositoryError> {
    let yaml = serde_yaml::to_string(obj)
      .context("error serializing object")?;

    let yaml_path = self.file_path_for_name(name);

    match fs::write(yaml_path, yaml).await{
      Ok(_) => {}
      Err(err) => {
        return Err(RepositoryError::Anyhow(err.into()));
      }
    }

    Ok(())
  }
}
