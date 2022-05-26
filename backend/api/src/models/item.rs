use chrono::{DateTime, Local};
use sqlx::{FromRow, Row};
use serde::{Serialize, Deserialize};
use crate::db::Db;


#[derive(Serialize, Deserialize, FromRow)]
pub struct Item {
    id: Option<i32>,
    name: String,
    img_uri: Option<String>,
    lend_start: DateTime<Local>,
    lend_end: DateTime<Local>,
    owner_id: i32,
    borrower_id: Option<i32>
}

impl Item {
    pub fn new(id:i32, name:String, img_uri:Option<String>, lend_start:DateTime<Local>, lend_end:DateTime<Local>, owner: i32, borrower: Option<i32>) -> Self {
        Self {
            id: Some(id),
            name: name,
            img_uri: img_uri,
            lend_start: lend_start,
            lend_end: lend_end,
            owner_id: owner,
            borrower_id: borrower
        }
    }

    pub async fn to_db(&self, db: &Db) {
        let q:String;
        match &self.img_uri {
            Some(uri) => {q = format!("INSERT INTO items (name, img_uri) VALUES ('{}', '{}') RETURNING id;", self.name, uri)}
            None => {q = format!("INSERT INTO items (name) VALUES ('{}') RETURNING id;", self.name)}
        }
        match &db.pool {
            Some(pool) => {
                match sqlx::query(&q)
                .fetch_one(&*pool).await {
                    Ok(row) => {
                        info!("Item created.");
                        let item_id:i32 = row.get("id");
                        match self.borrower_id {
                            Some(b) => {
                                match sqlx::query(&format!("INSERT INTO user_items VALUES ({}, {}, {}, '{}', '{}')", item_id, self.owner_id, b, self.lend_start, self.lend_end))
                                .execute(&*pool).await {
                                    Ok(_) => info!("user_item record created."),
                                    Err(e) => warn!("user item creation error: {}", e)
                                }
                            },
                            None => {
                                match sqlx::query(&format!("INSERT INTO user_items (item_id, owner_id) VALUES ({}, {}, '{}', '{}')", item_id, self.owner_id, self.lend_start, self.lend_end))
                                .execute(&*pool).await {
                                    Ok(_) => info!("user_item record created."),
                                    Err(e) => warn!("user item creation error: {}", e)
                                }
                            }
                        }
                        
                    }
                    Err(e) => warn!("Item creation error: {}",e)
                }
            }
            None => warn!("No database connections exist.")
        }
    }

    pub async fn from_db(db: &Db, id:String) -> Option<Self> {
        match &db.pool {
            Some(pool) => {
                match sqlx::query_as::<_, Self>(&format!("SELECT * FROM items WHERE id = {};", id))
                .fetch_one(*&pool).await {
                    Ok(item) => Some(item),
                    Err(err) => {
                        warn!("Database query error: {}", err);
                        None
                    }
                }
            },
            None => {
                warn!("No database connections exist");
                None
            }
        }
    }
}

pub fn test_items(id1:i32, id2:i32) -> [Item; 2] {
    [Item::new(1, "testitem1".to_string(), Some("img1.jpg".to_string()), Local::now(), Local::now(), id1, Some(id2)),
    Item::new(2, "testitem2".to_string(), Some("img2.jpg".to_string()), Local::now(), Local::now(), id2, Some(id1))]
}