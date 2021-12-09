mod icon_sets;

use actix_web::{web};

pub fn service(cfg: &mut web::ServiceConfig) {
    cfg
        .service(icon_sets::select)
        .service(icon_sets::search)
    // .service(dashboard::search)
    ;
}