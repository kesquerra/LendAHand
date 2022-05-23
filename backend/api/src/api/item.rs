use actix_web::{web, get, post, delete, Scope, HttpResponse, Responder};
use crate::SessionData;
use crate::api::{log_api, HttpError};
use crate::models::item::{Item, test_items};

static ITEM_PREFIX:&str = "/item";

pub fn config() -> Scope {
    web::scope(ITEM_PREFIX)
    .service(all_items)
    .service(item_by_id)
    .service(create_item)
    .service(delete_item_by_id)
}

pub fn log_item(method:&str, route:&str) {
    log_api(method, &format!("{}{}", ITEM_PREFIX, route))
}

#[get("")]
async fn all_items(data: web::Data<SessionData>) -> impl Responder {
    log_item("GET", "");
    let db = &data.db;
    match db.get_items().await {
        Some(items) => {
            HttpResponse::Ok().json(items)
        }
        None => {
            HttpResponse::Ok().json(test_items())
        }
    }
}

#[post("")]
async fn create_item(data: web::Data<SessionData>, item_json: web::Json<Item>) -> impl Responder {
    log_item("POST", "");
    let item: Item = item_json.into_inner();
    item.to_db(&data.db).await;
    HttpResponse::Created().json(item)
}

#[get("/{id}")]
async fn item_by_id(data: web::Data<SessionData>, id: web::Path<String>) -> impl Responder {
    let id_str = id.into_inner();
    log_item("GET", &format!("/{}", id_str));
    match Item::from_db(&data.db, id_str).await {
        Some(item) => HttpResponse::Ok().json(item),
        None => HttpResponse::BadRequest().json(HttpError {
            status_code: 400,
            message: "item not found".to_string()
        })
    }
}

#[delete("/{id}")]
async fn delete_item_by_id(data: web::Data<SessionData>, id: web::Path<String>) -> impl Responder {
    let id_str = id.into_inner();
    log_item("DELETE", &format!("/{}", id_str));
    let db = &data.db;
    if db.delete_kind_by_id("items", &id_str).await {
        HttpResponse::NoContent().finish()
    } else {
        HttpResponse::BadRequest().json(HttpError {
            status_code: 400,
            message: "item not found".to_string()
        })
    }

}