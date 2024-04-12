const path = require('path');

const rootDir = require('../util/path');

const express = require('express');

const router = express.Router();

router.get('/products',(req, res) => {
    console.log('products list');
    res.send('<h1>Product List</h1>');
});


router.get('/add-product',(req, res) => {
    console.log('add product form');
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});


router.post('/add-product', (req,res) => {
    console.log(req.body);
    res.redirect('/products');
})

module.exports = router;