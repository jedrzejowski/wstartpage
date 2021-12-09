use actix_web::{Error, web, HttpResponse, get};
use serde::{Deserialize, Serialize};
use serde_json::json;
use crate::config;
use std::vec::Vec;

#[derive(Deserialize, Serialize)]
pub struct Icon {
    title: Option<String>,
    icon: Option<String>,
    url: String,
}

#[derive(Deserialize, Serialize)]
pub struct IconSection {
    title: String,
    width: Option<i32>,
    widgets: Vec<Icon>,
    order: Option<i32>,
}

#[derive(Deserialize, Serialize)]
pub struct IconSet {
    includes: Option<Vec<String>>,
    top: Option<Vec<IconSection>>,
    middle: Option<Vec<IconSection>>,
    right: Option<Vec<IconSection>>,
    left: Option<Vec<IconSection>>,
    bottom: Option<Vec<IconSection>>,
}

#[derive(Deserialize)]
pub struct SelectParams {
    id: String,
}

#[get("/icon-collections/{id}")]
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

    let file_content: serde_yaml::Result<IconSet> = serde_yaml::from_reader(file.unwrap());

    if file_content.is_err() {
        return Ok(HttpResponse::InternalServerError()
            .json(json!({
                "error": file_content.err().unwrap().to_string()
            })));
    }

    return Ok(HttpResponse::Ok().json(file_content.unwrap()));
}

#[get("/icon-collections")]
pub async fn search() -> Result<HttpResponse, Error> {
    let paths = std::fs::read_dir(config::dashboard_files_root.as_str())?;

    let names: Vec<String> = paths.flatten().filter(|dir_entry| {
        dir_entry.file_type().unwrap().is_file()
    }).map(|dir_entry| {
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
