const express = require('express');
const productController = require('../../controller/v1/product-controller');


const router = express.Router();
router.post('/create', productController.createProduct);
router.get('/get-all', productController.getProducts);
router.get('/get-by-user/:userId', productController.getProductsByUser);
module.exports = router;