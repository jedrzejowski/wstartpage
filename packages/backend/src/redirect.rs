use actix_web::{get, web, HttpResponse, http};

#[get("/~{name}")]
pub async fn tilda(web::Path(name): web::Path<String>) -> HttpResponse {

    let url = format!("/?iconSets={}", name);

    HttpResponse::TemporaryRedirect()
        .header(http::header::LOCATION, url)
        .finish()
}

#[get("/@{name}")]
pub async fn monkey(web::Path(name): web::Path<String>) -> HttpResponse {

    let url = format!("/?iconSets={}", name);

    HttpResponse::TemporaryRedirect()
        .header(http::header::LOCATION, url)
        .finish()
}