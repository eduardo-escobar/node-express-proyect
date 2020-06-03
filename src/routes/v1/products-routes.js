const express = require('express');
const productController = require('../../controller/v1/product-controller');


const router = express.Router();
router.post('/create', productController.createProduct);
module.exports = router;