CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY NOT NULL,
    name varchar(255) NOT NULL,
    is_lent_item BOOLEAN,
    img_uri TEXT,
    lend_start TIMESTAMPTZ,
    lend_end TIMESTAMPTZ
);