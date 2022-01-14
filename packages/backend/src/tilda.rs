use actix_web::{get, web, HttpResponse, http};

#[get("/~{name}")]
pub async fn tilda_redirect(web::Path(name): web::Path<String>) -> HttpResponse {

    let url = format!("/?iconSets={}", name);

    HttpResponse::TemporaryRedirect()
        .header(http::header::LOCATION, url)
        .finish()
}