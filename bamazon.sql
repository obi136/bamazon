DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL (10,2),
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acer Gaming Laptop", "Electronics", 1499.49, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tokyo Ghoul Plush Toy", "Toys & Games", 29.99, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Catcher In The Rye", "Books", 19.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Farina", "Food", 129.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Grand Tour Blu Ray/DVD", "Movies & TV", 39.99, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Razer Blade Laptor", "Electronics", 1999.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kaoruko Moeta Nendoroid", "Toys & Games", 99.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1984", "Books", 19.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wolfgang Amadeus Phoenix", "Music", 9.99, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Toys & Games", 299.99, 200);


