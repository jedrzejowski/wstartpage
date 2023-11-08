use crate::utils::http::{AppHttpError, AppHttpResult};

pub fn assert_path_not_backwards<S: AsRef<str>>(path: S) -> Result<(), AppHttpError> {
  if path.as_ref().starts_with("..") {
    return Err(AppHttpError::bad_request("path starts with two dots"));
  }

  return Ok(());
}
