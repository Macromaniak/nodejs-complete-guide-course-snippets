const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getProducts);

router.get('/products', shopController.getAllProducts);

router.get('/products/:pID', shopController.getProductDetails)

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);

router.post('/cart-delete-product', shopController.deleteCartItem);

router.post('/create-order', shopController.postCreateOrder);

module.exports = router;
