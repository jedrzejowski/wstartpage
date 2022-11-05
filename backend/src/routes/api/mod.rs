mod icon_tiles;

use actix_web::{web};

pub fn service(cfg: &mut web::ServiceConfig) {
    cfg
        .service(icon_tiles::select)
        .service(icon_tiles::search)
    // .service(dashboard::search)
    ;
}
