use std::fmt;
use actix_web::error::ResponseError;
use actix_web::http::{StatusCode};
use actix_web::{HttpResponse, HttpResponseBuilder};
use serde_json::json;

#[derive(Debug)]
pub struct AppError {
  status_code: StatusCode,
  error_message: String,
}

impl AppError {
  pub fn internal<T: Into<String>>(text: T) -> AppError {
    return AppError {
      status_code: StatusCode::INTERNAL_SERVER_ERROR,
      error_message: text.into(),
    };
  }

  pub fn not_found<T: Into<String>>(text: T) -> AppError {
    return AppError {
      status_code: StatusCode::NOT_FOUND,
      error_message: text.into(),
    };
  }
}

impl fmt::Display for AppError {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    write!(f, "AppError")
  }
}

impl ResponseError for AppError {
  fn status_code(&self) -> StatusCode {
    self.status_code
  }

  fn error_response(&self) -> HttpResponse {
    HttpResponseBuilder::new(self.status_code).json(json!({
      "error": self.error_message,
    }))
  }
}
