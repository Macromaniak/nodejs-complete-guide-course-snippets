const express = require('express');

const router = express.Router();

router.get('/users',(req, res) => {
    console.log('middleware 2');
    res.send('<h1>Users List</h1>');
});


router.get('/add-user',(req, res) => {
    console.log('middleware 3');
    res.send('<form action="/admin/add-user" method="POST"><input type="text" name="fullname"><input type="submit" name="Add"></form>');
});


router.post('/add-user', (req,res) => {
    console.log(req.body);
    res.redirect('/admin/users');
})

module.exports = router