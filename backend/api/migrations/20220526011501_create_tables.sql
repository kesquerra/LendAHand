CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL,
    img_uri TEXT
);

CREATE TABLE IF NOT EXISTS user_items (
    item_id INT NOT NULL,
    owner_id INT NOT NULL,
    borrower_id INT,
    lend_start TIMESTAMPTZ,
    lend_end TIMESTAMPTZ,
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