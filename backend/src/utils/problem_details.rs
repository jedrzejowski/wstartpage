use std::fmt;
use axum::body::Body;
use axum::Json;
use axum::response::{IntoResponse, Response};
use http::StatusCode;

pub type HttpResult<T> = Result<T, ProblemDetails>;
pub type JsonResult<T> = HttpResult<Json<T>>;

#[derive(Debug)]
pub struct ProblemDetails {
  status_code: StatusCode,
  error_message: Option<String>,
}

impl ProblemDetails {
  pub fn internal(text: impl AsRef<str>) -> ProblemDetails {
    ProblemDetails {
      status_code: StatusCode::INTERNAL_SERVER_ERROR,
      error_message: Some(text.as_ref().to_string()),
    }
  }

  pub fn not_found(text: impl AsRef<str>) -> ProblemDetails {
    ProblemDetails {
      status_code: StatusCode::NOT_FOUND,
      error_message: Some(text.as_ref().to_string()),
    }
  }

  pub fn bad_request(text: impl AsRef<str>) -> ProblemDetails {
    ProblemDetails {
      status_code: StatusCode::BAD_REQUEST,
      error_message: Some(text.as_ref().to_string()),
    }
  }

  pub fn unauthorized(text: impl AsRef<str>) -> ProblemDetails {
    ProblemDetails {
      status_code: StatusCode::UNAUTHORIZED,
      error_message: Some(text.as_ref().to_string()),
    }
  }
}

impl fmt::Display for ProblemDetails {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    write!(f, "AppError")
  }
}

impl IntoResponse for ProblemDetails {
  fn into_response(self) -> Response {
    Response::builder()
      .status(self.status_code)
      .body(Body::empty())
      .unwrap()
  }
}
