const express = require('express');

const router = express.Router();

router.get('/',(req, res) => {
    console.log('middleware 1');
    res.send('<h1>Hello Express JS!</h1>');
});

module.exports = router;