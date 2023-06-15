CREATE DATABASE TiemTra;

USE TiemTra;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') NOT NULL
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    note VARCHAR(255),
    district VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE CartDetail (
    cart_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE OrderDetails (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

INSERT INTO products (product_name, description, price) VALUES
    ('Matcha', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 10.99),
    ('Sencha', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 11.99),
    ('Hojicha', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 10.99),
    ('Konacha', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 7.99),
    ('Genmaicha', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 8.99),
    ('Tamaruokucha', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 9.99),
    ('Jasmine', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 13.99),
    ('Lavender', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 12.99),
    ('Lily', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 17.99),
    ('Osmanthus', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 20.99),
    ('Rose', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 10.99),
    ('VN_Olong', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 21.99),
    ('VN_Sen', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 26.99),
    ('VN_NonTom', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 12.99),
    ('India_Nilgiri', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 11.99),
    ('India_Darjeeling', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 14.99),
    ('China_Longtinh', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 8.99),
    ('China_HSMP', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.', 16.99);
