const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProducts } = require('../controller/product')

router.get('/products', getAllProducts); 
router.get('/products/:id', getProductById) 
router.post('/addproducts', addProducts)


module.exports = router;
