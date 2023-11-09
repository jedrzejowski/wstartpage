mod app_config;
mod utils;
mod routes;
mod model;
mod user_source;
mod data_source;

use anyhow::Result;
use actix_files::Files as ActixFiles;
use actix_web::{App, HttpServer, middleware::Logger, web};
use crate::app_config::AppConfig;
use crate::data_source::DataSource;
use crate::user_source::UserSource;

#[actix_web::main]
async fn main() -> Result<()> {
  env_logger::init();

  let app_config = AppConfig::read_from_env()?;
  let app_config = web::Data::new(app_config);

  let user_source = user_source::StaticUserSource::from_csv_file("./misc/dev-users.csv").await?
    .into_service();

  let data_source = data_source::FileDataSource::from_path(&app_config.dashboard_root)
    .into_service();

  let bind = app_config.bind();

  let mut http_server = HttpServer::new(move || App::new()
    .app_data(app_config.clone())
    .app_data(user_source.clone())
    .app_data(data_source.clone())
    .wrap(Logger::new("%r %a %{User-Agent}i"))
    .wrap(utils::cors::default_config())
    .service(routes::redirect::tilda)
    .service(routes::redirect::monkey)
    .service(web::scope("/api").configure(routes::api::service))
    .service(ActixFiles::new("/img", &app_config.image_root))
    .service(ActixFiles::new("/editor", &app_config.editor_root).index_file("index.html"))
    .service(ActixFiles::new("/", &app_config.viewer_root).index_file("index.html"))
  );

  http_server = http_server.bind(bind)?;
  Ok(http_server.run().await?)
}

