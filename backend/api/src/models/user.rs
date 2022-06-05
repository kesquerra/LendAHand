use serde::{Serialize, Deserialize};
use sqlx::{FromRow};
use crate::db::Db;
use crate::models::item::{Item, ItemClass};


#[derive(Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: Option<i32>,
    pub username: String,
    pub password: String,
}

impl User {
    pub fn new(id:i32, username: String, password:String) -> Self {
        Self {
            id: Some(id),
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
        let q = format!("INSERT INTO users (username, password) VALUES ('{}', '{}');", self.username, self.password);
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

    pub async fn from_db_by_username(db: &Db, username:String) -> Option<Self> {
        match &db.pool {
            Some(pool) => {
                match sqlx::query_as::<_, Self>(&format!("SELECT * FROM users WHERE username = '{}';", username))
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

    pub async fn update_borrow(&self, db: &Db, item_id: Option<i32>) -> bool {
        match self.id {
            Some(id) => match &db.pool {
                Some(pool) => {
                    let bid:String;
                    match item_id {
                        Some(id) => {bid = id.to_string();}
                        None => {bid = "NULL".to_string();}
                    }
                    match sqlx::query(&format!("UPDATE user_items SET borrower_id = {} WHERE item_id = {};", bid, id))
                    .execute(*&pool).await {
                        Ok(_) => true,
                        Err(e) => {
                            warn!("Query error: {}", e);
                            false
                        }
                    }
                },
                None => false
            },
            None => false
        }
    }

    pub async fn get_items(&self, db: &Db, class:ItemClass) -> Option<Vec<Item>> {
        match &db.pool {
            Some(pool) => {
                let q:String;
                match class {
                    ItemClass::Owned => {
                        q = format!("SELECT * FROM items i JOIN user_items ui ON ui.item_id = i.id WHERE ui.owner_id = {}", self.id.unwrap());
                    },
                    ItemClass::Borrowed => {
                        q = format!("SELECT * FROM items i JOIN user_items ui ON ui.item_id = i.id WHERE ui.borrower_id = {}", self.id.unwrap());
                    }
                }
                match sqlx::query_as::<_, Item>(&q)
                .fetch_all(*&pool).await {
                    Ok(items) => Some(items),
                    Err(e) => {
                        warn!("Database query error: {}", e);
                        None
                    }
                }
            },
            None => {
                warn!("No database connections exist.");
                None
            }
        }
    }
}

pub fn test_users() -> [User; 3] {
    [User::new(1, "testuser1".to_string(), "testpassword1".to_string()),
    User::new(2, "testuser2".to_string(), "testpassword2".to_string()),
    User::new(3, "testuser3".to_string(), "testpassword3".to_string())]
}