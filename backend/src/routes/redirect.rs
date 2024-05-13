use axum::extract::Path;
use axum::response::{Redirect};

pub async fn tilda(Path(name): Path<String>) -> Redirect {

  let url = format!("/?tile-collection={}", name);

  Redirect::temporary(&url)
}

pub async fn monkey(Path(name): Path<String>) -> Redirect {
  let url = format!("/?tile-collection={}", name);

  Redirect::temporary(&url)
}
