var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/login', function(req, res) {
	res.render('login.ejs', {message: req.flash('loginMessage')});
});

router.get('/signup', function(req, res) {
	res.render('signup.ejs', {message: req.flash('loginMessage')});
});

router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile.ejs', {user: req.user});
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
	faulureFlash: true,
}))


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = router;
