use once_cell::sync::Lazy;

fn make_absolute(path: &mut String) -> String {
    let q = std::path::Path::new(path);
    return std::fs::canonicalize(q).unwrap().to_str().unwrap().parse().unwrap();
}

fn get_path_from_env(env_name: &str) -> String {
    let mut path = String::from("./");
    let result = std::env::var(env_name);

    if result.is_ok() {
        path = result.unwrap();
    }

    make_absolute(&mut path);

    return path;
}

fn get_app_bind() -> String {
    String::from("0.0.0.0:8080")
}


#[allow(non_upper_case_globals)]
pub static static_files_root: Lazy<String> = Lazy::new(|| get_path_from_env("WSTARTPAGE_STATIC_ROOT"));

#[allow(non_upper_case_globals)]
pub static dashboard_files_root: Lazy<String> = Lazy::new(|| get_path_from_env("WSTARTPAGE_DASHBOARD_ROOT"));

#[allow(non_upper_case_globals)]
pub static image_files_root: Lazy<String> = Lazy::new(|| get_path_from_env("WSTARTPAGE_IMAGE_ROOT"));

#[allow(non_upper_case_globals)]
pub static app_bind: Lazy<String> = Lazy::new(|| get_app_bind());
