mod app_config;
mod utils;
mod routes;
mod data;

use anyhow::Result;
use actix_files::Files as ActixFiles;
use actix_web::{App, HttpServer, middleware::Logger, web};
use crate::app_config::AppConfig;

#[actix_web::main]
async fn main() -> Result<()> {
  let app_config = AppConfig::read_from_env()?;
  let app_config = web::Data::new(app_config);
  let bind = app_config.bind();

  let mut http_server = HttpServer::new(move || App::new()
    .app_data(app_config.clone())
    .wrap(Logger::new("%r %a %{User-Agent}i"))
    .wrap(utils::cors::default_config())
    .service(routes::redirect::tilda)
    .service(routes::redirect::monkey)
    .service(web::scope("/api").configure(crate::routes::api::service))
    .service(ActixFiles::new("/img", &app_config.image_root))
    .service(ActixFiles::new("/editor", &app_config.editor_root).index_file("index.html"))
    .service(ActixFiles::new("/", &app_config.viewer_root).index_file("index.html"))
  );

  http_server = http_server.bind(bind)?;
  Ok(http_server.run().await?)
}

