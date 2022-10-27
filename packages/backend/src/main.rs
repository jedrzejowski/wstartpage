extern crate serde;

mod config;
mod http;
mod routes;
mod data;

use actix_files::Files as ActixFiles;
use actix_web::{App, HttpServer, middleware::Logger, web};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
  config::cfg.init_logger();

  let mut http_server = HttpServer::new(|| App::new()
    .wrap(Logger::new("%r %a %{User-Agent}i"))
    .wrap(crate::http::cors::default_config())
    .service(crate::routes::redirect::tilda)
    .service(crate::routes::redirect::monkey)
    .service(web::scope("/api").configure(crate::routes::api::service))
    .service(ActixFiles::new("/img", &config::cfg.image_root))
    .service(ActixFiles::new("/", &config::cfg.static_root).index_file("index.html"))
  );

  log::info!("binding server to {}", config::cfg.app_bind());
  http_server = http_server.bind(config::cfg.app_bind())?;

  http_server.run().await
}

