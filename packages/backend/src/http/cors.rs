use actix_web::http;
use actix_cors::Cors;

pub fn default_config() -> Cors {
  if cfg!(debug_assertions) {
    return Cors::permissive();
  }

  let mut cors = Cors::default()
    .allowed_methods(vec!["GET", "POST"])
    .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
    .allowed_header(http::header::CONTENT_TYPE)
    .max_age(3600);
  //
  // .allowed_origin("https://www.rust-lang.org/")
  // .allowed_origin_fn(|origin, _req_head| {
  //   origin.as_bytes().ends_with(b".rust-lang.org")
  // })

  return cors;
}
