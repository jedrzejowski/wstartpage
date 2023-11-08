use actix_web::{get, web, HttpResponse, http};

#[get("/~{name}")]
pub async fn tilda(params: web::Path<String>) -> HttpResponse {
  let name = params.into_inner();

  let url = format!("/?tile-collection={}", name);

  HttpResponse::TemporaryRedirect()
    .append_header((http::header::LOCATION, url))
    .finish()
}

#[get("/@{name}")]
pub async fn monkey(params: web::Path<String>) -> HttpResponse {
  let name = params.into_inner();
  let url = format!("/?tile-collection={}", name);

  HttpResponse::TemporaryRedirect()
    .append_header((http::header::LOCATION, url))
    .finish()
}
