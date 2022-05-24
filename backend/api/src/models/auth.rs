use serde::{Serialize, Deserialize};

// TODO: this should be refactored into User with Option<id>
#[derive(Serialize, Deserialize)]
pub struct AuthUser {
    pub username: String,
    pub password: String
}