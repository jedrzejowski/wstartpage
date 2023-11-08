mod tile_collections;
mod images;
mod session;

use actix_web::{web};

pub fn service(cfg: &mut web::ServiceConfig) {
  cfg
    // .service(
    //   web::scope("/session")
    //     .route("", web::post().to(session::create))
    //     .route("", web::get().to(session::get))
    //     // .route("", web::delete().to(session::delete))
    // )
    .service(
      web::scope("/tile-collections")
        .route("", web::get().to(tile_collections::search))
        .route("/{name}", web::get().to(tile_collections::select))
        .route("/{name}", web::put().to(tile_collections::update))
    )
    .service(
      web::scope("/images")
        .route("", web::get().to(images::search))
    )
  ;
}
