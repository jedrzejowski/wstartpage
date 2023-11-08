use std::fmt;
use actix_web::error::ResponseError;
use actix_web::http::{header, StatusCode};
use actix_web::{HttpResponse, HttpResponseBuilder};
use serde_json::json;

pub type AppHttpResult = Result<HttpResponse, AppHttpError>;

#[derive(Debug)]
pub struct AppHttpError {
  status_code: StatusCode,
  error_message: Option<String>,
}

pub trait IntoAppHttpError {
  fn into_error_message(self, status_code: StatusCode) -> AppHttpError;
}

impl AppHttpError {
  pub fn internal<T: IntoAppHttpError>(text: T) -> AppHttpError {
    text.into_error_message(StatusCode::INTERNAL_SERVER_ERROR)
  }

  pub fn not_found<T: IntoAppHttpError>(text: T) -> AppHttpError {
    text.into_error_message(StatusCode::NOT_FOUND)
  }

  pub fn bad_request<T: IntoAppHttpError>(text: T) -> AppHttpError {
    text.into_error_message(StatusCode::BAD_REQUEST)
  }

  pub fn unauthorized<T: IntoAppHttpError>(text: T) -> AppHttpError {
    text.into_error_message(StatusCode::UNAUTHORIZED)
  }
}

impl IntoAppHttpError for () {
  fn into_error_message(self, status_code: StatusCode) -> AppHttpError {
    return AppHttpError {
      status_code: status_code.into(),
      error_message: None,
    };
  }
}

impl IntoAppHttpError for &str {
  fn into_error_message(self, status_code: StatusCode) -> AppHttpError {
    return AppHttpError {
      status_code,
      error_message: Some(self.into()),
    };
  }
}

impl IntoAppHttpError for String {
  fn into_error_message(self, status_code: StatusCode) -> AppHttpError {
    return AppHttpError {
      status_code,
      error_message: Some(self.into()),
    };
  }
}

impl fmt::Display for AppHttpError {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    write!(f, "AppError")
  }
}

impl ResponseError for AppHttpError {
  fn status_code(&self) -> StatusCode {
    self.status_code
  }

  fn error_response(&self) -> HttpResponse {
    if let Some(text) = &self.error_message {
      HttpResponseBuilder::new(self.status_code).json(json!({
        "error": self.error_message,
      }))
    } else {
      HttpResponseBuilder::new(self.status_code)
        .append_header((header::CONTENT_TYPE, mime::TEXT_PLAIN))
        .body(self.status_code.to_string().to_lowercase())
    }
  }
}
