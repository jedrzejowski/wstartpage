use actix_web::{HttpResponse};
use crate::http::app_error::AppError;

pub type AppResult = Result<HttpResponse, AppError>;

