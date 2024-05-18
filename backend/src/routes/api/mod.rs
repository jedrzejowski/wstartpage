use axum::Router;
use axum::routing::get;
use crate::app_state::AppState;

mod tile_collections;
mod images;
mod session;
mod users;

pub fn make_router() -> Router<AppState> {
  Router::new()
    // .service(
    //   web::scope("/session")
    //     .route("", web::post().to(session::create))
    //     .route("", web::get().to(session::get))
    //     // .route("", web::delete().to(session::delete))
    // )
    .route("/users/me", get(users::me))
    .route("/tile-collections", get(tile_collections::search))
    .route("/tile-collections/:name", get(tile_collections::select).put(tile_collections::update))
  // .service(
  //   web::scope("/images")
  //     .route("", web::get().to(images::search))
  // )
}
