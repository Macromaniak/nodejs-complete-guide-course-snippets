const User = require('../models/user');
const { use } = require('../routes/admin');

exports.getLogin = (req,res,next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}

exports.postLogin = (req,res,next) => {
    User.findById('667bcc492a925be0a24cf54b')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        console.log('setting user in session');
        console.log(user);
        console.log(req.session.user);
        res.redirect('/');
    })
    .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
}