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


async function addToCart(req,res) {
    const userId = req.params.userId
    const productId = req.params.productId
    let cartId;
    const sql = 'SELECT * FROM carts WHERE user_id = ' + userId 
    const checkQuery = 'SELECT * FROM cartProducts WHERE product_id = ? AND cart_id = ?'
    const query = 'INSERT INTO cartProducts (product_id, cart_id, qty) VALUES (?, ?, ?)' 

    let [rows] = await pool.promise().query(sql)
        if(rows.length <= 0) {
            let userId = req.params.userId
            const addCart = 'INSERT INTO carts (user_id) VALUES (?)' 
            let [addCartRows]= await pool.promise().query(addCart, [userId])
            cartId = addCartRows.insertId;             
        } else {
                cartId = rows[0].id; 
        }
       
   [getCartProductRow] = await pool.promise().query(checkQuery, [productId, cartId])  
        if (getCartProductRow.length <= 0) {
          let [cartProductRow] = await pool.promise().query(query, [productId, cartId, 1])
                return res.send({"message": "Product has been added to cart"})
        } else {
            let productQty = getCartProductRow[0].qty;
            productQty++;
            pool.promise().query("UPDATE cartProducts SET qty = " + productQty + " WHERE product_id = "+ productId + " AND cart_id = "+ cartId)
                return res.send({"message": "Product has been added to cart"})
        }
} 


async function removeProductFromCart(req, res) {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    console.log(cartId);
    console.log(productId);
    const checkQuery = 'SELECT * FROM cartProducts WHERE product_id = ? AND cart_id = ?'
    const removeQuery = 'DELETE FROM cartProducts WHERE product_id = ? AND cart_id = ?'

    let [rows] = await pool.promise().query(checkQuery, [productId, cartId])
    console.log(rows)
    if (rows.length <= 0) {
        res.send({message: 'product not in cart'})
    }else {
        let productQty = rows[0].qty;
        console.log(productQty)
        if(productQty > 1) {
            productQty--;
            let [qtyRows] = await pool.promise().query("UPDATE cartProducts SET qty = " + productQty + " WHERE product_id = "+ productId + " AND cart_id = "+ cartId)
            res.send({message: 'product removed from cart'})
        } else {
           pool.promise().query(removeQuery, [productId, cartId])
           res.send({message: 'product removed from cart'})
        }   
    }

}

async function clearCart (req, res) {
    const cartId = req.params.cartId
    const deleteQuery = 'DELETE FROM cartProducts WHERE cart_id = ?'
    let [rows] = await pool.promise().query(deleteQuery, [cartId])
    res.send({message: 'Cart cleared!'})
}

async function getCart (req, res) {
    const cartId = req.params.cartId
    const cart = 'SELECT products.title, products.description, products.price, cartProducts.qty as itemQty FROM cartProducts join products on cartProducts.product_id = products.id where cart_id = ?'
    let [rows] = await pool.promise().query(cart, [cartId])
    if (rows.length <= 0) {return res.send({message: "Cart is empty"})}
    const total = rows.reduce((acc, x) => (x.price * x.itemQty) + acc, 0)
    res.send({items: rows, total})
}

module.exports = { addToCart, removeProductFromCart, clearCart, getCart };