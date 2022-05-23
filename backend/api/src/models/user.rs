use serde::{Serialize, Deserialize};
use sqlx::{FromRow};
use crate::db::Db;


#[derive(Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
}

impl User {
    pub fn new(id:i32, username: String, password:String) -> Self {
        Self {
            id: id,
            username: username,
            password: password
        }
    }

    pub async fn from_db(db: &Db, id:String) -> Option<Self> {
        match &db.pool {
            Some(pool) => {
                match sqlx::query_as::<_, Self>(&format!("SELECT * FROM users WHERE id = {};", id))
                .fetch_one(*&pool).await {
                    Ok(user) => Some(user),
                    Err(err) => {
                        warn!("Database query error: {}", err);
                        None
                    }
                }
            }
            None => {
                warn!("No database connections exist.");
                None
            }
        }
    }

    pub async fn to_db(&self, db: &Db) {
        let q = format!("INSERT INTO users VALUES ({}, '{}', '{}');", self.id, self.username, self.password);
        match &db.pool {
            Some(pool) => {
                match sqlx::query(&q)
                .execute(&*pool).await {
                    Ok(_) => info!("User created."),
                    Err(e) => warn!("User creation error: {}", e)
                }
            }
            None => warn!("No database connections exist.")
        }
    }
}

pub fn test_users() -> [User; 3] {
    [User::new(1, "testuser1".to_string(), "testpassword1".to_string()),
    User::new(2, "testuser2".to_string(), "testpassword2".to_string()),
    User::new(3, "testuser3".to_string(), "testpassword3".to_string())]
}