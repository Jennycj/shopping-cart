const express = require('express');
const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host : 'localhost',
  user : 'root',
  password : 'password',
  database : 'shopping-cart',

})


const app = express();
const port = 3000;


app.listen(() => console.log(`listening on port ${port}`));

