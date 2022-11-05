use actix_web::{HttpResponse};
use crate::util::app_error::AppError;

pub type AppResult = Result<HttpResponse, AppError>;

