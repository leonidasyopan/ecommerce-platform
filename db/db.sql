/* DROP ALL TABLES IN CASE A RESET IS NECESSARY */
DROP TABLE IF EXISTS user_access CASCADE;
DROP TABLE IF EXISTS user_account CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS product_category CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

/***************
**** TABLES ****
***************/

CREATE TABLE user_access (
    user_id             SERIAL         PRIMARY KEY      NOT NULL,
    username            VARCHAR(100)                    NOT NULL    UNIQUE,
    password            VARCHAR(255)                    NOT NULL,
    email               VARCHAR(255)                    NOT NULL,    
    user_create_date    DATE
);

SELECT * FROM user_access;


CREATE TABLE user_account (
    user_id             INTEGER                         NOT NULL,
    first_name          VARCHAR(255),   
    middle_name         VARCHAR(255),
    last_name           VARCHAR(255),
    birthday            DATE,
    phone_number        VARCHAR(20),
    address             VARCHAR(100),
    city                VARCHAR(100),
    state               VARCHAR(100),
    country             VARCHAR(100),
    zipcode             VARCHAR(100),
CONSTRAINT user_account_fk_1    FOREIGN KEY(user_id)      REFERENCES user_access(user_id)
);

SELECT * FROM user_account;

CREATE TABLE product_category (
    product_category_id     SERIAL         PRIMARY KEY      NOT NULL,
    category_name           VARCHAR(100)
);

SELECT * FROM product_category;

CREATE TABLE products (
    product_id          SERIAL      PRIMARY KEY     NOT NULL, 
    product_name        VARCHAR(100)                NOT NULL, 
    product_price       NUMERIC                     NOT NULL, 
    product_description VARCHAR(500), 
    product_image       VARCHAR(100), 
    product_category_id INTEGER                     NOT NULL, 
    product_stock       REAL,
CONSTRAINT products_fk_1    FOREIGN KEY(product_category_id)      REFERENCES product_category(product_category_id)
);

SELECT * FROM products;

CREATE TABLE orders (
    order_id          SERIAL      PRIMARY KEY     NOT NULL, 
    user_id           INTEGER                     NOT NULL, 
    product_id        INTEGER                     NOT NULL,
    order_amount      INTEGER, 
    order_date        DATE,
CONSTRAINT orders_fk_1     FOREIGN KEY(user_id)      REFERENCES user_access(user_id),
CONSTRAINT orders_fk_2     FOREIGN KEY(product_id)      REFERENCES products(product_id)
);

SELECT * FROM orders;


/********************
**** INSERT DATA ****
********************/

/* INSERT USER_ACCESS */
INSERT INTO user_access (
    username, 
    password, 
    email, 
    user_create_date)
VALUES (
    'leonidasyopan',
    '10081985',
    'leonidasyopan@gmail.com',
    current_timestamp);

INSERT INTO user_access (
    username, 
    password, 
    email, 
    user_create_date)
VALUES (
    'cs313visitor',
    'cs313pass',
    'test@gmail.com',
    current_timestamp);

SELECT * FROM user_access;

/* INSERT USER_ACCOUNT */
INSERT INTO user_account (
    user_id, 
    first_name, 
    middle_name, 
    last_name, 
    birthday,
    phone_number,
    address, 
    city, 
    state, 
    country, 
    zipcode)
VALUES (
    (SELECT user_id FROM user_access WHERE username = 'leonidasyopan'),
    'Leonidas',
    '',
    'Yopan',
    '1985-08-10',
    '+55 48 99823-5707',
    'Rua Marinho Arthur Mariano, 30',
    'São José',
    'SC',
    'Brazil',
    '88106-555');

INSERT INTO user_account (
    user_id, 
    first_name, 
    middle_name, 
    last_name, 
    birthday,
    phone_number,
    address, 
    city, 
    state, 
    country, 
    zipcode)
VALUES (
    (SELECT user_id FROM user_access WHERE username = 'cs313visitor'),
    'BYU',
    'Idaho',
    'Visitor',
    '1995-01-01',
    '+1 208 496-1411',
    '525 South Center St.',
    'Rexburg',
    'ID',
    'USA',
    '83460');

SELECT * FROM user_account;

/* INSERT PRODUCT_CATEGORY */
INSERT INTO product_category (
    category_name)
VALUES (
    'book'
);

INSERT INTO product_category (
    category_name)
VALUES (
    'DVD'
);

INSERT INTO product_category (
    category_name)
VALUES (
    'smartphone'
);

INSERT INTO product_category (
    category_name)
VALUES (
    'tablet'
);

INSERT INTO product_category (
    category_name)
VALUES (
    'laptop'
);

INSERT INTO product_category (
    category_name)
VALUES (
    'desktop'
);

SELECT * FROM product_category;

/* INSERT PRODUCTS */
INSERT INTO products (
    product_name, 
    product_price, 
    product_description, 
    product_image, 
    product_category_id, 
    product_stock)
VALUES (
    'The Book of Mormon',
    '3.5',
    'A religious book about the people who lived in the Americas',
    'https://images-na.ssl-images-amazon.com/images/I/31%2B70VO5FHL.jpg',
    (SELECT product_category_id FROM product_category WHERE category_name = 'book'),
    15);

INSERT INTO products (
    product_name, 
    product_price, 
    product_description, 
    product_image, 
    product_category_id, 
    product_stock)
VALUES (
    'The Goonies',
    '9.5',
    'The Goonies is a 1985 American adventure comedy film co-produced and directed by Richard Donner from a screenplay by Chris Columbus, based on a story by executive producer Steven Spielberg.',
    'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Goonies.jpg/220px-The_Goonies.jpg',
    (SELECT product_category_id FROM product_category WHERE category_name = 'DVD'),
    6);

SELECT * FROM products;


/* INSERT ORDERS */
INSERT INTO orders (
    user_id, 
    product_id,
    order_amount, 
    order_date)
VALUES (
    (SELECT user_id FROM user_access WHERE username = 'leonidasyopan'),
    (SELECT product_id FROM products WHERE product_name = 'The Book of Mormon'),
    3,    
    current_timestamp);

SELECT * FROM orders;

/* EXTRA CODE */

UPDATE product_category
SET 
    category_name = 'book'
WHERE
    product_category_id = '1';