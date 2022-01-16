const express = require('express');
const router = express.Router();
const {addToCart, removeProductFromCart, clearCart, getCart} = require('../controller/cart')

router.post('/carts/:userId/:productId', addToCart)
router.get('/carts/clear/:userId/:cartId', clearCart)
router.get('/carts/:userId/:cartId/:productId', removeProductFromCart)
router.get('/carts/:cartId', getCart)

module.exports = router;
