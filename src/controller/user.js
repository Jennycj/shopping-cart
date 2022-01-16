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


function getAllUsers(req, res) {
    const sql = 'SELECT * FROM users'
    pool.query(sql, function (err, result) {
        if (err) {
            throw err
        };
        res.send(result)
    });
}

function getUserById(req, res) {
    const id = req.params.id
    const sql = 'SELECT * FROM users WHERE id = ?'
    pool.query(sql, [id], function (err, result) {
        if (err) {
            throw err
        };
        res.send(result)
    });
}

function addUsers(req, res) {
    const sql = 'INSERT INTO users (id, username, password, email) VALUES (1, "jay", "password", "jay@example.com"), (2, "sam", "wowza!", "sam@example.com"), (3, "boss", "access", "boss@example.com")';
    pool.query(sql, function (err, result) {
        if (err) {
            throw err
        };
        res.send(result)
    });
}

module.exports = {getAllUsers, getUserById, addUsers}

