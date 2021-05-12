/* Replace with your SQL commands */
CREATE TABLE products
(
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    price integer NOT NULL,
    category varchar(50) NOT NULL
);