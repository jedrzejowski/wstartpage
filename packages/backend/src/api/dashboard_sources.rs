use actix_web::{Error, web, HttpResponse, get};
use serde::{Deserialize, Serialize};
use crate::config;
use std::vec::Vec;

#[derive(Deserialize, Serialize)]
pub struct DashboardWidget {
    title: Option<String>,
    icon: Option<String>,
    url: String,
}

#[derive(Deserialize, Serialize)]
pub struct DashboardSection {
    title: String,
    width: Option<i32>,
    widgets: Vec<DashboardWidget>,
    order: Option<i32>,
}

#[derive(Deserialize, Serialize)]
pub struct Dashboard {
    top: Option<Vec<DashboardSection>>,
    middle: Option<Vec<DashboardSection>>,
    right: Option<Vec<DashboardSection>>,
    left: Option<Vec<DashboardSection>>,
    bottom: Option<Vec<DashboardSection>>,
}

#[derive(Deserialize)]
pub struct SelectParams {
    id: String,
}

#[get("/dashboardSources/{id}")]
pub async fn select(
    params: web::Path<SelectParams>,
) -> Result<HttpResponse, Error> {
    let mut yaml_path = std::path::PathBuf::from(config::dashboard_files_root.as_str());
    yaml_path.push(&params.id);
    yaml_path.set_extension("yml");

    let file = std::fs::File::open(yaml_path);

    if file.is_err() {
        return Ok(HttpResponse::NotFound().finish());
    }

    let file_content: serde_yaml::Result<Dashboard> = serde_yaml::from_reader(file.unwrap());

    if file_content.is_err() {
        eprintln!("Application error: {}", file_content.err().unwrap());
        return Ok(HttpResponse::InternalServerError().finish());
    }

    Ok(HttpResponse::Ok().json(file_content.unwrap()))
}

#[get("/dashboardSources")]
pub async fn search() -> Result<HttpResponse, Error> {
    let paths = std::fs::read_dir(config::dashboard_files_root.as_str())?;

    let names: Vec<String> = paths.flatten().filter(|dir_entry|{
        dir_entry.file_type().unwrap().is_file()
    }).map(|dir_entry|{
        dir_entry.path()
    }).filter(|path| {
        match path.extension().unwrap().to_str().unwrap() {
            "yml" => true,
            "yaml" => true,
            _ => false,
        }
    }).map(|path| {
        path.file_stem().unwrap().to_str().unwrap().to_string()
    }).collect();

    Ok(HttpResponse::Ok().json(names))
}
