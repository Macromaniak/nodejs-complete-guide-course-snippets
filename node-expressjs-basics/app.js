const express = require('express');

const app = express();

// app.use((req, res, next) => {
//     console.log('middleware 1');
//     next();
// });
// app.use((req, res, next) => {
//     console.log('middleware 2');
//     res.send('<h1>Hello Express JS!</h1>');
// });

app.get('/users',(req, res) => {
    console.log('middleware 2');
    res.send('<h1>Users List</h1>');
});

app.get('/',(req, res) => {
    console.log('middleware 1');
    res.send('<h1>Hello Express JS!</h1>');
});

app.listen(3000);