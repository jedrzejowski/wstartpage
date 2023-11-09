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
        .service(tile_collections::search)
        .service(tile_collections::select)
        .service(tile_collections::update)
    )
    .service(
      web::scope("/images")
        .route("", web::get().to(images::search))
    )
  ;
}
