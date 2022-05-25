CREATE TABLE IF NOT EXISTS user_items (
    item_id INT PRIMARY KEY NOT NULL,
    owner_id INT NOT NULL,
    borrower_id INT,
    CONSTRAINT item 
        FOREIGN KEY(item_id) 
        REFERENCES items(id),
    CONSTRAINT own
        FOREIGN KEY(owner_id) 
        REFERENCES users(id),
    CONSTRAINT borrow
        FOREIGN KEY(borrower_id)
        REFERENCES users(id)
);