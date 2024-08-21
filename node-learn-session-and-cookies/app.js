const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

MDB_URI = 'mongodb+srv://anandhunatesh:htvCVibjITOQZtdm@cluster0.abszlhr.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

const store = new mongoDbStore({
  uri: MDB_URI,
  collection: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));

app.use((req, res, next) => {
  if(!req.session.user) {
    console.log('not set');
    return next();
  }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        console.log('yes set');
        console.log(req.user);
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(
    MDB_URI
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Anandhu',
          email: 'anandhu@phases.io',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
