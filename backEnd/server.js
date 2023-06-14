// Import các module cần thiết và thiết lập ứng dụng express
const express = require('express');
const app = express();
const path = require('path');

// Cấu hình kết nối tới cơ sở dữ liệu MySQL
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'avolovebot123',
    password: 'vinamilk',
    database: 'TiemTra'
});
// Kết nối tới cơ sở dữ liệu MySQL
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
    } else {
        console.log('Connected to the database');
    }
});

// Xuất dự liệu sản phẩm
app.get('/Delights', (req, res) => {
    // Truy vấn cơ sở dữ liệu để lấy thông tin các sản phẩm
    const query = 'SELECT product_name, price, description FROM Products';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi khi truy vấn cơ sở dữ liệu:', error);
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    });
});
// Nhấn nút add sản phẩm vào cart
app.get('/Delights/add-to-cart/:productId', (req, res) => {
    // Get the product ID from the request params
    const productId = req.params.productId;

    // Check if the user is logged in
    if (!req.session.userId) {
        // User is not logged in, redirect to the login page
        res.redirect('/login');
    } else {
        // User is logged in, proceed to add the product to the cart
        // Get the user ID from the session
        const userId = req.session.userId;

        // Check if the product already exists in the cart
        const checkQuery = `SELECT * FROM cart_detail WHERE user_id = ${userId} AND product_id = ${productId}`;
        connection.query(checkQuery, (error, results) => {
            if (error) {
                console.error('Error checking product in cart:', error);
                res.sendStatus(500);
            } else {
                if (results.length > 0) {
                    // Product already exists in the cart
                    res.send('Sản phẩm đã có trong giỏ hàng');
                } else {
                    // Product doesn't exist in the cart, add it
                    const insertQuery = `INSERT INTO cart_detail (user_id, product_id, quantity) VALUES (${userId}, ${productId}, 1)`;
                    connection.query(insertQuery, (error, results) => {
                        if (error) {
                            console.error('Error adding product to cart:', error);
                            res.sendStatus(500);
                        } else {
                            res.send('Sản phẩm đã được thêm vào giỏ hàng');
                        }
                    });
                }
            }
        });
    }
});









app.listen(3000, () => {
    console.log('Server is running on port 3000');
});