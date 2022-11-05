extern crate serde;

mod app_config;
mod util;
mod routes;
mod data;

use actix_files::Files as ActixFiles;
use actix_web::{App, HttpServer, middleware::Logger, web};
use crate::app_config::app_config;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
  app_config::app_config.init_logger();

  let mut http_server = HttpServer::new(|| App::new()
    .wrap(Logger::new("%r %a %{User-Agent}i"))
    .wrap(crate::util::cors::default_config())
    .service(crate::routes::redirect::tilda)
    .service(crate::routes::redirect::monkey)
    .service(web::scope("/api").configure(crate::routes::api::service))
    .service(ActixFiles::new("/img", &app_config.image_root))
    .service(ActixFiles::new("/editor", &app_config.editor_root).index_file("index.html"))
    .service(ActixFiles::new("/", &app_config.viewer_root).index_file("index.html"))
  );

  log::info!("binding server to {}", app_config.app_bind());
  http_server = http_server.bind(app_config.app_bind())?;

  http_server.run().await
}

