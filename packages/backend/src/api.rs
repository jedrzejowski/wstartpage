mod dashboard_sources;

use actix_web::{web};

pub fn service(cfg: &mut web::ServiceConfig) {
    cfg
        .service(dashboard_sources::select)
        .service(dashboard_sources::search);
}