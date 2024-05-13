use crate::utils::problem_details::{ProblemDetails, HttpResult};

pub fn assert_path_not_backwards<S: AsRef<str>>(path: S) -> Result<(), ProblemDetails> {
  if path.as_ref().starts_with("..") {
    return Err(ProblemDetails::bad_request("path starts with two dots"));
  }

  return Ok(());
}
