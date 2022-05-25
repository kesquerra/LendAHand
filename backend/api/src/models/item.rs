use chrono::{DateTime, Local};
use sqlx::FromRow;
use serde::{Serialize, Deserialize};
use crate::db::Db;


#[derive(Serialize, Deserialize, FromRow)]
pub struct Item {
    id: Option<i32>,
    name: String,
    is_lent_item: bool,
    img_uri: String,
    lend_start: DateTime<Local>,
    lend_end: DateTime<Local>
}

impl Item {
    pub fn new(id:i32, name:String, is_lent_item:bool, img_uri:String, lend_start:DateTime<Local>, lend_end:DateTime<Local>) -> Self {
        Self {
            id: Some(id),
            name: name,
            is_lent_item: is_lent_item,
            img_uri: img_uri,
            lend_start: lend_start,
            lend_end: lend_end
        }
    }

    pub async fn to_db(&self, db: &Db) {
        let q = format!("INSERT INTO items (name, is_lent_item, img_uri, lend_start, lend_end) VALUES ('{}', {}, '{}', '{}', '{}');",
        self.name, self.is_lent_item, self.img_uri, self.lend_start.to_rfc3339(), self.lend_end.to_rfc3339());
        match &db.pool {
            Some(pool) => {
                match sqlx::query(&q)
                .execute(&*pool).await {
                    Ok(_) => info!("Item created."),
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
    [Item::new(1, "testitem1".to_string(), true, "img1.jpg".to_string(), Local::now(), Local::now()),
    Item::new(2, "testitem2".to_string(), false, "img2.jpg".to_string(), Local::now(), Local::now())]
}