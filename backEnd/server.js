// Import các module cần thiết và thiết lập ứng dụng express
const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');

// Cấu hình kết nối tới cơ sở dữ liệu MySQL
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'avolovebot123',
    password: 'vinamilk',
    database: 'Hoteo'
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
    const query = 'SELECT product_name, price, description, moredescription FROM Products';

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

// Register user
app.post('/register', (req, res) => {
    const { username,phonenumber, password, confirmpassword } = req.body;

    // Kiểm tra xem người dùng đã bỏ trống trường thông tin nào hay không
    if (!username||!phonenumber || !password || !confirmpassword) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
    }

    // Kiểm tra xem password và confirmpassword có trùng nhau hay không
    if (password !== confirmpassword) {
        return res.status(400).json({ error: 'Mật khẩu không khớp' });
    }

    // Kiểm tra xem người dùng đã đồng ý với các điều khoản và điều kiện hay chưa
    const agreed = req.body.agreed;
    if (!agreed) {
        return res.status(400).json({ error: 'Bạn phải đồng ý với các điều khoản và điều kiện' });
    }

    // Kiểm tra xem tên người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
    const checkUserQuery = 'SELECT * FROM Users WHERE username = ?';
    db.query(checkUserQuery, [username], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
            return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'Tên người dùng đã tồn tại' });
        }

        // Băm mật khẩu sử dụng bcrypt
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                console.error('Lỗi khi băm mật khẩu:', err);
                return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
            }

            // Thêm người dùng mới vào cơ sở dữ liệu
            const insertUserQuery = 'INSERT INTO Users (username, phonenumber, password, role) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [username,phonenumber, hashedPassword, 'customer'], (err, result) => {
                if (err) {
                    console.error('Lỗi khi thêm người dùng vào cơ sở dữ liệu:', err);
                    return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
                }
                return res.send('Đăng ký thành công. Bạn có thể đăng nhập vào tài khoản của mình.');
            });
        });
    });
});

// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    const sql = 'SELECT * FROM Users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const user = results[0];

        // Compare the password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (!isMatch) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            // Redirect to appropriate page based on user role
            if (user.role === 'admin') {
                res.redirect('/Admin/AdminHome');
                res.send('Đăng nhập thành công. Chào mừng bạn đến trang admin!');
            } else if (user.role === 'customer') {
                res.redirect('/Delights');
                res.send('Đăng nhập thành công. Chào mừng bạn đến trang mua hàng!');
            } else {
                res.status(401).json({ error: 'Invalid role' });
            }
        });
    });
});

// Route handler cho trang "PacketInformation"
app.get('/PacketInformation', (req, res) => {
    // Lấy user ID từ session (giả sử bạn đã lưu user ID vào session)
    const userId = req.session.userId;

    // Truy vấn dữ liệu từ bảng cart_detail dựa trên user ID
    const selectQuery = `
        SELECT 
        cart_detail.product_id, 
        products.product_name, 
        cart_detail.quantity, 
        products.price, 
        cart_detail.quantity * products.price AS total_price
        FROM 
        cart_detail
        INNER JOIN 
        products ON cart_detail.product_id = products.product_id
        WHERE 
        cart_detail.user_id = ${userId}
        `;

    // Truy vấn để tính tổng giá trị đơn hàng
    const sumQuery = `
        SELECT 
        SUM(cart_detail.quantity * products.price) AS total_order_value
        FROM 
        cart_detail
        INNER JOIN 
        products ON cart_detail.product_id = products.product_id
        WHERE 
        cart_detail.user_id = ${userId}
        `;

    // Thực hiện truy vấn để lấy thông tin cart_detail
    connection.query(selectQuery, (error, results) => {
        if (error) {
            console.error('Error retrieving cart details:', error);
            res.sendStatus(500);
        } else {
            // Lấy kết quả từ truy vấn
            const cartDetails = results;

            // Thực hiện truy vấn để lấy tổng giá trị đơn hàng
            connection.query(sumQuery, (error, results) => {
                if (error) {
                    console.error('Error retrieving total order value:', error);
                    res.sendStatus(500);
                } else {
                    // Lấy tổng giá trị đơn hàng từ kết quả truy vấn
                    const totalOrderValue = results[0].total_order_value;

                    // Gửi kết quả về cho client
                    res.json({ cartDetails, totalOrderValue });
                }
            });
        }
    });

    // Tăng số lượng sản phẩm trong Cart_detail và tính lại thông tin tổng giá trị đơn hàng
    app.get('/increaseQuantity/:product_id', (req, res) => {
        const { product_id } = req.params;
        const user_id = req.session.userId;

        // Kiểm tra sản phẩm có tồn tại trong Cart_detail của user không
        const checkSql = 'SELECT * FROM Cart_detail WHERE user_id = ? AND product_id = ?';
        db.query(checkSql, [user_id, product_id], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Product not found in cart' });
                return;
            }

            const cartItem = results[0];
            const newQuantity = cartItem.quantity + 1;

            // Cập nhật số lượng sản phẩm trong Cart_detail
            const updateSql = 'UPDATE Cart_detail SET quantity = ? WHERE user_id = ? AND product_id = ?';
            db.query(updateSql, [newQuantity, user_id, product_id], (err, result) => {
                if (err) {
                    console.error('Error updating quantity in Cart_detail:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                // Tính lại thông tin tổng giá trị đơn hàng
                const totalValueSql = `
                    SELECT SUM(quantity * price) AS totalValue
                    FROM Cart_detail
                    JOIN Products ON Cart_detail.product_id = Products.product_id
                    WHERE user_id = ?`;
                db.query(totalValueSql, [user_id], (err, result) => {
                    if (err) {
                        console.error('Error calculating total value:', err);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }

                    const totalValue = result[0].totalValue;

                    // Trả về số lượng sản phẩm và tổng giá trị đơn hàng cho client
                    res.status(200).json({ success: 'Quantity increased successfully', newQuantity, totalValue });
                });
            });
        });
    });



    // Giảm số lượng sản phẩm trong Cart_detail và tính lại thông tin tổng giá trị đơn hàng
    app.get('/decreaseQuantity/:product_id', (req, res) => {
        const { product_id } = req.params;
        const user_id = req.session.userId;

        // Kiểm tra sản phẩm có tồn tại trong Cart_detail của user không
        const checkSql = 'SELECT * FROM Cart_detail WHERE user_id = ? AND product_id = ?';
        db.query(checkSql, [user_id, product_id], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ error: 'Product not found in cart' });
                return;
            }

            const cartItem = results[0];
            const newQuantity = cartItem.quantity - 1;

            // Cập nhật số lượng sản phẩm trong Cart_detail
            const updateSql = 'UPDATE Cart_detail SET quantity = ? WHERE user_id = ? AND product_id = ?';
            db.query(updateSql, [newQuantity, user_id, product_id], (err, result) => {
                if (err) {
                    console.error('Error updating quantity in Cart_detail:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }

                // Tính lại thông tin tổng giá trị đơn hàng
                const totalValueSql = `
                    SELECT SUM(quantity * price) AS totalValue
                    FROM Cart_detail
                    JOIN Products ON Cart_detail.product_id = Products.product_id
                    WHERE user_id = ?`;
                db.query(totalValueSql, [user_id], (err, result) => {
                    if (err) {
                        console.error('Error calculating total value:', err);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }

                    const totalValue = result[0].totalValue;

                    // Trả về số lượng sản phẩm và tổng giá trị đơn hàng cho client
                    res.status(200).json({ success: 'Quantity decreased successfully', newQuantity, totalValue });
                });
            });
        });
    });

    // Xử lý khi bấm vào nút xác nhận đơn hàng
    app.post('/confirmOrder', (req, res) => {

        //Lấy thông tin cart Detail dựa trên Order_id
        const selectQuery = 'SELECT * FROM cart_detail WHERE user_id = ?';
        db.query(selectQuery, [user_id], (err, cartItems) => {
            if (err) {
                console.error('Error retrieving cart items:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            // Duyệt qua từng phần tử trong cartItems và thực hiện lưu vào order_detail
            cartItems.forEach((cartItem) => {
                const { user_id, product_id, quantity } = cartItem;
                // Thực hiện câu truy vấn để lưu vào `order_detail`
                const insertQuery = 'INSERT INTO order_detail (user_id, product_id, quantity) VALUES (?, ?, ?)';
                db.query(insertQuery, [user_id, product_id, quantity], (err, result) => {
                    if (err) {
                        console.error('Error adding item to order detail:', err);
                        res.status(500).json({ error: 'Internal server error' });
                        return;
                    }

                    // Xóa sản phẩm đã được lưu vào `order_detail` khỏi `cart_detail`
                    const deleteQuery = 'DELETE FROM cart_detail WHERE user_id = ? AND product_id = ?';
                    db.query(deleteQuery, [user_id, product_id], (err, result) => {
                        if (err) {
                            console.error('Error deleting item from cart detail:', err);
                            res.status(500).json({ error: 'Internal server error' });
                            return;
                        }
                    });
                });
            });
        });
    });
});
// Trang CustomerInformation
app.post('/CustomerInformation', (req, res) => {
    // Lấy thông tin khách hàng từ yêu cầu
    const { fullName, phoneNumber, email, address, district, province, notes } = req.body;

    // Kiểm tra xem các trường bắt buộc đã được nhập đầy đủ hay chưa
    if (!fullName || !phoneNumber || !email || !address || !district || !province) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin bắt buộc' });
    }

    // Lấy ngày hôm nay
    const orderDate = new Date();

    // Lưu thông tin khách hàng vào bảng "orders" trong cơ sở dữ liệu
    const insertQuery = 'INSERT INTO orders (full_name, phone_number, email, address, district, province, notes, order_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(insertQuery, [fullName, phoneNumber, email, address, district, province, notes, orderDate], (error, results) => {
        if (error) {
            console.error('Lỗi khi lưu thông tin khách hàng:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }
        // Điều hướng đến trang xác nhận thanh toán hoặc trang thành công
        res.redirect('/PaymentConfirmation');
    });
});

// Trang dành cho admin
// Route handler cho trang dashboard
app.get('/Admin/AdminHome', (req, res) => {
    // Lấy day income
    const dayIncomeQuery = 'SELECT SUM(quantity * price) AS dayIncome FROM Orders JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id JOIN Products ON OrderDetails.product_id = Products.product_id WHERE Orders.order_date = CURDATE()';
    connection.query(dayIncomeQuery, (error, results) => {
        if (error) {
            console.error('Error fetching day income:', error);
            res.sendStatus(500);
        } else {
            const dayIncome = results[0].dayIncome;

            // Lấy month income
            const monthIncomeQuery = 'SELECT SUM(quantity * price) AS monthIncome FROM Orders JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id JOIN Products ON OrderDetails.product_id = Products.product_id WHERE MONTH(Orders.order_date) = MONTH(CURDATE())';
            connection.query(monthIncomeQuery, (error, results) => {
                if (error) {
                    console.error('Error fetching month income:', error);
                    res.sendStatus(500);
                } else {
                    const monthIncome = results[0].monthIncome;

                    // Lấy year income
                    const yearIncomeQuery = 'SELECT SUM(quantity * price) AS yearIncome FROM Orders JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id JOIN Products ON OrderDetails.product_id = Products.product_id WHERE YEAR(Orders.order_date) = YEAR(CURDATE())';
                    connection.query(yearIncomeQuery, (error, results) => {
                        if (error) {
                            console.error('Error fetching year income:', error);
                            res.sendStatus(500);
                        } else {
                            const yearIncome = results[0].yearIncome;

                            // Lấy dữ liệu cho biểu đồ đường: số lượng người mua hàng mỗi tháng
                            const monthlyBuyersQuery = 'SELECT MONTH(Orders.order_date) AS month, COUNT(DISTINCT Orders.user_id) AS buyers FROM Orders GROUP BY MONTH(Orders.order_date)';
                            connection.query(monthlyBuyersQuery, (error, results) => {
                                if (error) {
                                    console.error('Error fetching monthly buyers:', error);
                                    res.sendStatus(500);
                                } else {
                                    const monthlyBuyers = results;

                                    // Lấy dữ liệu cho biểu đồ cột: doanh thu theo tháng
                                    const monthlyIncomeQuery = 'SELECT MONTH(Orders.order_date) AS month, SUM(quantity * price) AS income FROM Orders JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id JOIN Products ON OrderDetails.product_id = Products.product_id GROUP BY MONTH(Orders.order_date)';
                                    connection.query(monthlyIncomeQuery, (error, results) => {
                                        if (error) {
                                            console.error('Error fetching monthly income:', error);
                                            res.sendStatus(500);
                                        } else {
                                            const monthlyIncome = results;

                                            // Lấy top 5 sản phẩm
                                            const topProductsQuery = 'SELECT Products.product_id, Products.product_name, SUM(OrderDetails.quantity) AS totalQuantity FROM OrderDetails JOIN Products ON OrderDetails.product_id = Products.product_id GROUP BY Products.product_id ORDER BY totalQuantity DESC LIMIT 5';
                                            connection.query(topProductsQuery, (error, results) => {
                                                if (error) {
                                                    console.error('Error fetching top products:', error);
                                                    res.sendStatus(500);
                                                } else {
                                                    const topProducts = results;

                                                    // Chuẩn bị dữ liệu để truyền cho trang dashboard
                                                    const data = {
                                                        dayIncome,
                                                        monthIncome,
                                                        yearIncome,
                                                        monthlyBuyers,
                                                        monthlyIncome,
                                                        topProducts
                                                    };

                                                    // Gửi phản hồi với dữ liệu cho trang dashboard
                                                    res.json(data);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

// Trang "OrdersManager"
app.get('/Admin/OrdersManager', (req, res) => {
    // Truy vấn danh sách đơn hàng và chi tiết đơn hàng
    const selectQuery = `
        SELECT Orders.*, OrderDetails.quantity, Products.product_name, Products.price
        FROM Orders
        INNER JOIN OrderDetails ON Orders.order_id = OrderDetails.order_id
        INNER JOIN Products ON OrderDetails.product_id = Products.product_id
    `;
    connection.query(selectQuery, (error, results) => {
        if (error) {
            console.error('Lỗi khi truy vấn danh sách đơn hàng:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }

        // Tính tổng giá trị đơn hàng
        let totalValue = 0;
        for (const order of results) {
            totalValue += order.quantity * order.price;
        }
        // Trả về kết quả dưới dạng JSON với danh sách đơn hàng và tổng giá trị đơn hàng
        res.json({ orders: results, totalValue });
    });
});

// Route handler cho trang "ProductManager"
app.get('/Admin/ProductManager', (req, res) => {
    // Truy vấn danh sách sản phẩm từ bảng "Products"
    const selectQuery = 'SELECT * FROM Products';
    connection.query(selectQuery, (error, results) => {
        if (error) {
            console.error('Lỗi khi truy vấn danh sách sản phẩm:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }

        // Hiển thị trang "ProductManager" với danh sách sản phẩm, Trả về danh sách sản phẩm dưới dạng JSON
        res.status(200).json({ products: results });
    });
});

// Route handler cho nút xóa sản phẩm trên trang ProductManager
app.post('/Admin/ProductManager/DeleteProduct', (req, res) => {
    // Lấy product_id từ yêu cầu
    const productId = req.body.productId;

    // Xóa sản phẩm khỏi bảng "Products"
    const deleteQuery = 'DELETE FROM Products WHERE product_id = ?';
    connection.query(deleteQuery, [productId], (error, results) => {
        if (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }

        // Điều hướng đến trang "ProductManager" sau khi xóa thành công
        res.redirect('/Admin/ProductManager');
    });
});

// Route handler cho nút sửa sản phẩm trên trang Product Manager
app.post('/Admin/ProductManager/EditProduct', (req, res) => {
    // Lấy thông tin sản phẩm từ yêu cầu
    const { productId, productName, description, price, moredescription } = req.body;

    // Cập nhật thông tin sản phẩm trong bảng "Products"
    const updateQuery = 'UPDATE Products SET product_name = ?, description = ?, price = ?, moredescription = ? WHERE product_id = ?';
    connection.query(updateQuery, [productName, description, price, moredescription, productId], (error, results) => {
        if (error) {
            console.error('Lỗi khi cập nhật thông tin sản phẩm:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }

        // Điều hướng đến trang "ProductManager" sau khi cập nhật thành công
        res.redirect('/Admin/ProductManager');
    });
});
// Route handler cho nút thêm sản phẩm cho trang Product Manager
app.post('/Admin/ProductManager/AddProduct', (req, res) => {
    const { productName, description, price, moredescription } = req.body;

    // Check if all required information is provided
    if (!productName || !description || !price) {
        return res.status(400).json({ error: 'Vui lòng nhập đủ thông tin sản phẩm.' });
    }

    // Add the product to the database
    const insertQuery = 'INSERT INTO Products (product_name, description, price, moredescription) VALUES (?, ?, ?, ?)';
    connection.query(insertQuery, [productName, description, price, moredescription], (error, results) => {
        if (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }

        // Redirect to the product manager page after successful addition
        res.redirect('/Admin/ProductManager');
    });
});
// Route handler cho trang "UsersInformation"
app.get('/Admin/UsersInformation', (req, res) => {
    // Truy vấn danh sách người dùng từ bảng "Users"
    const selectQuery = 'SELECT * FROM Users';
    connection.query(selectQuery, (error, results) => {
        if (error) {
            console.error('Lỗi khi truy vấn danh sách người dùng:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }

        // Hiển thị trang "UsersInformation" với danh sách người dùng dưới dạng JSON
        res.status(200).json({ users: results });
    });
});
// Route handler cho nút xóa người dùng trên trang UserInformation
app.post('/Admin/UsersInformation/DeleteUser', (req, res) => {
    // Lấy user_id từ yêu cầu
    const userId = req.body.userId;
    // Xóa người dùng khỏi bảng "Users"
    const deleteQuery = 'DELETE FROM Users WHERE user_id = ?';
    connection.query(deleteQuery, [userId], (error, results) => {
        if (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }
        // Điều hướng đến trang "UsersInformation" sau khi xóa thành công
        res.redirect('/Admin/UsersInformation');
    });
});

// Route handler cho trang "AdminInfor"
app.get('/Admin/AdminInfor', (req, res) => {
    // Lấy user_id từ session
    const userId = req.session.user_id;

    // Truy vấn thông tin của tài khoản admin từ bảng "Users" dựa trên user_id
    const selectQuery = 'SELECT user_id, username FROM Users WHERE user_id = ?';
    connection.query(selectQuery, [userId], (error, results) => {
        if (error) {
            console.error('Lỗi khi truy vấn thông tin admin:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }
        // Kiểm tra xem có kết quả trả về hay không
        if (results.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin admin' });
        }
        // Trả về thông tin của tài khoản admin dưới dạng JSON
        res.status(200).json({ admin: results[0] });
    });
});
// Nút đổi mật khẩu trong "AdminInfor"
app.post('/Admin/AdminInfor/ChangePassword', (req, res) => {
    // Lấy thông tin từ yêu cầu
    const { userId, currentPassword, newPassword, confirmPassword } = req.body;

    // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có trùng nhau không
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Mật khẩu mới và xác nhận mật khẩu không trùng nhau.' });
    }

    // Kiểm tra xem mật khẩu hiện tại của người dùng có chính xác không
    const selectUserQuery = 'SELECT * FROM Users WHERE user_id = ?';
    connection.query(selectUserQuery, [userId], (error, results) => {
        if (error) {
            console.error('Lỗi khi truy vấn thông tin người dùng:', error);
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Người dùng không tồn tại.' });
        }

        const user = results[0];

        // So sánh mật khẩu hiện tại với mật khẩu đã lưu trữ trong cơ sở dữ liệu
        bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
            if (err) {
                console.error('Lỗi khi so sánh mật khẩu:', err);
                return res.status(500).json({ error: 'Lỗi máy chủ' });
            }

            if (!isMatch) {
                return res.status(401).json({ error: 'Mật khẩu hiện tại không chính xác.' });
            }

            // Băm mật khẩu mới
            bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
                if (err) {
                    console.error('Lỗi khi băm mật khẩu:', err);
                    return res.status(500).json({ error: 'Lỗi máy chủ' });
                }

                // Cập nhật mật khẩu mới vào cơ sở dữ liệu
                const updatePasswordQuery = 'UPDATE Users SET password = ? WHERE user_id = ?';
                connection.query(updatePasswordQuery, [hashedPassword, userId], (error, results) => {
                    if (error) {
                        console.error('Lỗi khi cập nhật mật khẩu:', error);
                        return res.status(500).json({ error: 'Lỗi máy chủ' });
                    }

                    return res.send('Đổi mật khẩu thành công.');
                });
            });
        });
    });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
