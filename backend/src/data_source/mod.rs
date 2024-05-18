mod file;

use std::fmt::Debug;
use std::ops::Deref;

pub use file::FileDataSource;
use crate::utils::problem_details::ProblemDetails;

#[derive(thiserror::Error, Debug)]
pub enum RepositoryError {
  #[error("not found")]
  NotFound,
  #[error("internal error")]
  Anyhow(#[from] anyhow::Error),
}

pub type RepositoryResult<T> = Result<T, RepositoryError>;

impl From<RepositoryError> for ProblemDetails {
  fn from(value: RepositoryError) -> Self {
    todo!()
  }
}

// #[async_trait]
// pub trait DataSource: Sync + Send + Debug {
//   async fn get_tile_collection(&self, name: &str) -> Result<TileCollection, DataSourceError>;
//   async fn get_tile_collection_names(&self) -> Result<Vec<String>, DataSourceError>;
//   async fn update_tile_collection(&self, name: &str, tl: TileCollection) -> Result<(), DataSourceError>;
// }
