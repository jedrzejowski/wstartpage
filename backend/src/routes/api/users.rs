use axum::Router;

pub fn make_router() -> Router {
  Router::new()
}

// #[actix_web::get("/me")]
// pub async fn get_me(app_user: AppUser) -> HttpResponse {
//   return HttpResponse::Ok().json(app_user);
// }
