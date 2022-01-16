const mysql = require('mysql2')
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE 
});


function getAllProducts(req, res) {
    const sql = 'SELECT * FROM products'
    pool.query(sql, function (err, result) {
        if (err) {
            throw err
        };
        console.log("Result: " + result);
        res.send(result)
    })
}

function getProductById(req, res) {
    const id = req.params.id
    const sql = 'SELECT * FROM products WHERE id = ?'
    pool.query(sql, [id], function (err, result) {
        if (err) {
            throw err
        };
        console.log("Result: " + result);
        res.send(result)
    });   
}

function addProducts(req, res) {
    const sql = 'INSERT INTO products (id, title, description, sku, qty, category, price, expiry) VALUES (1, "apple", "a delicious green fruit", "A103B11", 10, "fruits", "50", CURRENT_DATE()), (2, "yam", "a delicious tuber", "B103E12", 15, "tubers", "100", CURRENT_DATE()), (3, "spinach", "Vitamin rich veggie", "C101B21", 5, "vegetables", "50", CURRENT_DATE()), (4, "orange", "a succulent fruit", "A350B22", 20, "fruits", "50", CURRENT_DATE())';
    pool.query(sql, function (err, result) {
        if (err) {
            throw err
        };
        console.log("Result: " + result);
        res.send(result)
    });  
}

module.exports = {getAllProducts, getProductById, addProducts};

