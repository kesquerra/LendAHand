use chrono::{DateTime, Local};
use sqlx::{FromRow, Row};
use serde::{Serialize, Deserialize};
use crate::db::Db;


#[derive(Serialize, Deserialize, FromRow)]
pub struct Item {
    id: Option<i32>,
    name: String,
    is_lent_item: bool,
    img_uri: String,
    lend_start: DateTime<Local>,
    lend_end: DateTime<Local>,
    owner_id: Option<i32>,
    borrower_id: Option<i32>
}

impl Item {
    pub fn new(id:i32, name:String, is_lent_item:bool, img_uri:String, lend_start:DateTime<Local>, lend_end:DateTime<Local>, owner: Option<i32>, borrower: Option<i32>) -> Self {
        Self {
            id: Some(id),
            name: name,
            is_lent_item: is_lent_item,
            img_uri: img_uri,
            lend_start: lend_start,
            lend_end: lend_end,
            owner_id: owner,
            borrower_id: borrower
        }
    }

    pub async fn to_db(&self, db: &Db) {
        let q = format!("INSERT INTO items (name, is_lent_item, img_uri, lend_start, lend_end) VALUES ('{}', {}, '{}', '{}', '{}') RETURNING id;",
        self.name, self.is_lent_item, self.img_uri, self.lend_start.to_rfc3339(), self.lend_end.to_rfc3339());
        match &db.pool {
            Some(pool) => {
                match sqlx::query(&q)
                .fetch_one(&*pool).await {
                    Ok(row) => {
                        info!("Item created.");
                        let item_id:i32 = row.get("id");
                        match (self.owner_id, self.borrower_id) {
                            (Some(o), Some(b)) => {
                                match sqlx::query(&format!("INSERT INTO user_items VALUES ({}, {}, {})", item_id, o, b))
                                .execute(&*pool).await {
                                    Ok(_) => info!("user_item record created."),
                                    Err(e) => warn!("user item creation error: {}", e)
                                }
                            },
                            (Some(o), None) => {
                                match sqlx::query(&format!("INSERT INTO user_items (item_id, owner_id) VALUES ({}, {})", item_id, o))
                                .execute(&*pool).await {
                                    Ok(_) => info!("user_item record created."),
                                    Err(e) => warn!("user item creation error: {}", e)
                                }
                            },
                            (_, _) => {}
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

pub fn test_items() -> [Item; 2] {
    [Item::new(1, "testitem1".to_string(), true, "img1.jpg".to_string(), Local::now(), Local::now(), Some(1), Some(2)),
    Item::new(2, "testitem2".to_string(), false, "img2.jpg".to_string(), Local::now(), Local::now(), Some(2), Some(1))]
}