const express = require('express');
const router = express.Router();
const {addToCart, removeProductFromCart, clearCart, getCart} = require('../controller/cart')

router.post('/cart/:userId/:productId', addToCart)
router.get('/cart/clear/:userId/:cartId', clearCart)
router.get('/cart/:userId/:cartId/:productId', removeProductFromCart)
router.get('/cart/:userId/:cartId', getCart)

module.exports = router;
