const express = require('express');

const router = express.Router();

router.get('/products',(req, res) => {
    console.log('products list');
    res.send('<h1>Product List</h1>');
});


router.get('/add-product',(req, res) => {
    console.log('add product form');
    res.send('<form action="create-product" method="POST"><input type="text" name="Productname"><input type="submit" name="Add"></form>');
});


router.post('/create-product', (req,res) => {
    console.log(req.body);
    res.redirect('/products');
})

module.exports = router;