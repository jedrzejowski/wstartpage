use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct TextIcon {
    text: String,
    #[serde(rename = "bgColor")]
    bg_color: String,
    #[serde(rename = "fontSize")]
    font_size: i32,
}

#[derive(Deserialize, Serialize)]
#[serde(untagged)]
pub enum Icon {
    ImageIcon(String),
    TextIcon(TextIcon),
}

#[derive(Deserialize, Serialize)]
pub struct IconWidget {
    title: Option<String>,
    icon: Option<Icon>,
    url: String,
}

#[derive(Deserialize, Serialize)]
pub struct IconSection {
    title: String,
    width: Option<i32>,
    widgets: Vec<IconWidget>,
    order: Option<i32>,
}

#[derive(Deserialize, Serialize)]
pub struct IconCollection {
    includes: Option<Vec<String>>,
    top: Option<Vec<IconSection>>,
    middle: Option<Vec<IconSection>>,
    right: Option<Vec<IconSection>>,
    left: Option<Vec<IconSection>>,
    bottom: Option<Vec<IconSection>>,
}


fn normalize_container(container: &mut Option<Vec<IconSection>>) {
    match container {
        Some(sections) => {
            sections.iter_mut().for_each(|section| {
                section.widgets.iter_mut().for_each(|widget| {
                    match &widget.icon {
                        None => { return; }
                        Some(icon) => {
                            match icon {
                                Icon::ImageIcon(icon) => {
                                    if icon.chars().nth(0).unwrap() == '!' {
                                        let mut text_icon = TextIcon {
                                            text: String::from(""),
                                            bg_color: String::from(""),
                                            font_size: 16,
                                        };

                                        for part in icon[1..].split('&') {
                                            let split: Vec<&str> = part.split('=').collect();

                                            if split.len() == 2 {
                                                match split[0] {
                                                    "text" => { text_icon.text = String::from(split[1]); }
                                                    "bgColor" => { text_icon.bg_color = String::from(split[1]); }
                                                    "fontSize" => { text_icon.font_size = split[1].parse().unwrap(); }
                                                    _ => {}
                                                }
                                            }
                                        }

                                        widget.icon = Some(Icon::TextIcon(text_icon));
                                    }
                                }
                                Icon::TextIcon(_) => {}
                            }
                        }
                    }
                })
            })
        }
        None => { return; }
    }
}

pub fn normalize_icon_collection(icon_collection: &mut IconCollection) {
    normalize_container(&mut icon_collection.top);
    normalize_container(&mut icon_collection.middle);
    normalize_container(&mut icon_collection.right);
    normalize_container(&mut icon_collection.left);
    normalize_container(&mut icon_collection.bottom);
}