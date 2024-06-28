const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoose = require('mongoose');

// const connectDb = mongodb.mongoConnect ;
// const getDb = mongodb.getDb;


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("667bcc492a925be0a24cf54b")
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// console.log(process)

mongoose.connect('mongodb+srv://anandhunatesh:htvCVibjITOQZtdm@cluster0.abszlhr.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    User.findOne()
    .then(user => {
        if(!user)
        {
            const user = new User({
                username: 'Anandhu',
                email: 'anandhu@phases.io',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000);
    console.log('listening');
})
.catch(err => {
    console.log(err);
})