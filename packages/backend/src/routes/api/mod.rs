mod icon_collections;

use actix_web::{web};

pub fn service(cfg: &mut web::ServiceConfig) {
    cfg
        .service(icon_collections::select)
        .service(icon_collections::search)
    // .service(dashboard::search)
    ;
}
