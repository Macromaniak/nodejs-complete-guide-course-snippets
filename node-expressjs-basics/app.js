const express = require('express');
const bodyParser = require('body-parser');

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

app.get('/users',(req, res) => {
    console.log('middleware 2');
    res.send('<h1>Users List</h1>');
});

app.get('/add-users',(req, res) => {
    console.log('middleware 3');
    res.send('<form action="create-user" method="POST"><input type="text" name="fullname"><input type="submit" name="Add"></form>');
});

app.post('/create-user', (req,res) => {
    console.log(req.body);
    res.redirect('/');
})

app.get('/',(req, res) => {
    console.log('middleware 1');
    res.send('<h1>Hello Express JS!</h1>');
});

app.listen(3000);