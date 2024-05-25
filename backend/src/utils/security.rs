use crate::utils::problem_details::{ProblemDetails};

pub fn assert_path_not_backwards<S: AsRef<str>>(path: S) -> Result<(), ProblemDetails> {
  if path.as_ref().contains("..") {
    return Err(ProblemDetails::bad_request("path contains two dots"));
  }

  return Ok(());
}
