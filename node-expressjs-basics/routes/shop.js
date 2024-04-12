const path = require('path');

const rootDir = require('../util/path');

const express = require('express');

const router = express.Router();

router.get('/',(req, res) => {
    console.log('middleware 1');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;