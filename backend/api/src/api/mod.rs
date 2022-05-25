pub mod user;
pub mod item;
pub mod auth;

use actix_web::{web, get, Scope, HttpResponse, Responder};
use serde::{Serialize, Deserialize};
use crate::logger;
use crate::SessionData;
use crate::api;

static PREFIX:&str = "/api";

#[derive(Serialize, Deserialize)]
struct ApiStatus {
    api_active: bool,
    db_active: bool
}

#[derive(Serialize, Deserialize)]
struct HttpError {
    status_code: i32,
    message: String
}

// return scope for api prefix with added function routes
pub fn config() -> Scope {
    web::scope(PREFIX)
        .service(status)
        .service(api::user::config())
        .service(api::item::config())
        .service(api::auth::config())
}

// helper to log api routes reached
pub fn log_api(method:&str, route:&str) {
    logger::route(method, PREFIX, route);
}

#[get("/status")] // api base page
async fn status(data: web::Data<SessionData>) -> impl Responder {
    log_api("GET", "/status");
    let db = &data.db;
    let db_status = match db.pool {
        Some(_) => true,
        None => false
    };
    let status = ApiStatus {
        api_active: true,
        db_active: db_status.clone()
    };
    HttpResponse::Ok().json(status)
}

