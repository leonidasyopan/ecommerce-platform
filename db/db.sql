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
    order_amount      INTEGER, 
    order_date        DATE,
CONSTRAINT orders_fk_1     FOREIGN KEY(user_id)      REFERENCES user_access(user_id)
);

SELECT * FROM orders;