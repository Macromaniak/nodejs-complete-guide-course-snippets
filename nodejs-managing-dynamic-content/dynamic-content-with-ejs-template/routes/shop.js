const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require('./admin');

const products = adminData.products;

router.get('/', (req, res, next) => {
  console.log('shop.js', products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'});
});

module.exports = router;
