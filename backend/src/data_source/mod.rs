mod file;

use std::fmt::Debug;
use async_trait::async_trait;
use crate::model::tile_collection::TileCollection;

pub use file::FileDataSource;

#[derive(thiserror::Error, Debug)]
pub enum DataSourceError {
  #[error("not found")]
  NotFound,
  #[error("internal error")]
  Anyhow(#[from] anyhow::Error),
}

#[async_trait]
pub trait DataSource: Sync + Send + Debug {
  async fn get_tile_collection(&self, name: &str) -> Result<TileCollection, DataSourceError>;
  async fn get_tile_collection_names(&self) -> Result<Vec<String>, DataSourceError>;
  async fn update_tile_collection(&self, name: &str, tl: TileCollection) -> Result<(), DataSourceError>;

  fn into_service(self) -> DataSourceService
    where Self: Sized + 'static {
    actix_web::web::Data::new(Box::new(self))
  }
}

pub type DataSourceService = actix_web::web::Data<Box<dyn DataSource>>;
