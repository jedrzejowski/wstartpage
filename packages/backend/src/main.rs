extern crate serde;

mod config;
mod api;
mod types;
mod redirect;

use actix_files::Files as ActixFiles;
use actix_web::{App, HttpServer, web};

#[actix_web::main]
async fn main() -> std::io::Result<()> {

    HttpServer::new(|| App::new()
        .service(redirect::tilda)
        .service(redirect::monkey)
        .service(web::scope("/api").configure(api::service))
        .service(ActixFiles::new("/img", &config::cfg.image_root))
        .service(ActixFiles::new("/", &config::cfg.static_root).index_file("index.html"))
    ).bind(config::cfg.app_bind())?.run().await
}
