const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const productRouter = require('./src/routes/product')
const userRouter = require('./src/routes/users')
const cartRouter = require('./src/routes/cart')
dotenv.config();

const port = process.env.PORT;
const app = express();



const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE  
});

pool.getConnection((err, connection) => {
    if(err){
        throw(err) 
    }; 
    console.log('db connected'); 
    pool.query("CREATE DATABASE IF NOT EXISTS shop", function (err, result) {
      if (err) throw err;
    }); 

    const userSql = "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY auto_increment, username VARCHAR(25) UNIQUE NOT NULL, password CHAR(60) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL)";
    pool.query(userSql, function (err, result) {
      if (err) throw err;
    });

    const productSql = "CREATE TABLE IF NOT EXISTS products (id INT PRIMARY KEY auto_increment, title VARCHAR(25) NOT NULL, description CHAR(60) NOT NULL, sku VARCHAR(10) UNIQUE NOT NULL, qty INT NOT NULL, category VARCHAR(25) NOT NULL, price INT NOT NULL, expiry DATE)";
    pool.query(productSql, function (err, result) {
      if (err) throw err;
    });

    const cartSql = "CREATE TABLE IF NOT EXISTS carts (id INT PRIMARY KEY auto_increment, user_id INT)";
    pool.query(cartSql, function (err, result) {
      if (err) throw err;
    });

    const pivotSql = "CREATE TABLE IF NOT EXISTS cartProducts (id INT PRIMARY KEY auto_increment, product_id INT, cart_id INT, qty INT)";
    pool.query(pivotSql, function (err, result) {
      if (err) throw err;
    });
})

app.use('/', productRouter)
app.use('/', userRouter);
app.use('/', cartRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
 
module.exports = app;  