extern crate serde;

mod config;
mod api;
mod types;

use actix_files::Files as ActixFiles;
use actix_web::{App, HttpServer, web};

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    HttpServer::new(|| App::new()
        .service(web::scope("/api").configure(api::service))
        .service(ActixFiles::new("/img", config::image_files_root.as_str()))
        .service(ActixFiles::new("/", config::static_files_root.as_str()).index_file("index.html"))
    ).bind(config::app_bind.as_str())?.run().await
}
