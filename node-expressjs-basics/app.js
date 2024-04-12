const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');
const shopRoutes = require('./routes/shop');
const productRoutes = require('./routes/products');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// app.use((req, res, next) => {
//     console.log('middleware 1');
//     next();
// });
// app.use((req, res, next) => {
//     console.log('middleware 2');
//     res.send('<h1>Hello Express JS!</h1>');
// });

app.use('/admin', userRoutes);
app.use(shopRoutes);
app.use(productRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);