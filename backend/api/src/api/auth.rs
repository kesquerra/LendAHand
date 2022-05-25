use actix_web::{web, post, Scope, HttpResponse, Responder};
use crate::SessionData;
use crate::api::HttpError;
use crate::models::user::User;
use bcrypt::verify;

static AUTH_PREFIX:&str = "/auth";

pub fn config() -> Scope {
    web::scope(AUTH_PREFIX)
    .service(authenticate_user)
}

#[post("")]
async fn authenticate_user(data: web::Data<SessionData>, user_json: web::Json<User>) -> impl Responder {
    let auth: User = user_json.into_inner();
    match User::from_db_by_username(&data.db, auth.username).await {
        Some(user) => {
            let valid = verify(auth.password, &user.password).unwrap();
            info!("{}", valid);
            if valid {
                HttpResponse::Ok().json(user)
            } else {
                HttpResponse::NotFound().json(HttpError {
                    status_code: 404,
                    message: "password incorrect".to_string()
                })
            }
        }
        None => HttpResponse::NotFound().json(HttpError {
            status_code: 404,
            message: "user not found".to_string()
        })
    }
}