var express = require('express');
var router = express.Router();
var passport = require('passport');
var secret = require('../config/secret');
var Users = require('../models/users');

var jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/secret', jwtAuth, function(req, res){
  res.json({message: "Success! You can not see this without a token"});
});

router.get('/login', function(req, res) {
	res.render('login.ejs', {message: req.flash('loginMessage')});
});

router.get('/signup', function(req, res) {
	res.render('signup.ejs');
});

router.get('/profile', jwtAuth, function(req, res) {
	console.log(req.user)
	res.render('profile.ejs', {user: req.user});
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.post('/signup/reg', function(req, res) {
	console.log('signup route', req.body);
	if (!req.body.email || !req.body.password) {
		res.status(400).json({
			success: false, 
			message: 'please enter email and password'
		});
	} else {
		Users.find( {email: req.body.email.toLowerCase()} , function(err, rez) {
			if (err) {
				res.status(400);
			}
			if (rez[0]) {
				console.log('signup: user already exists', rez);
				res.json({
					success: false,
					message: 'email address is already registered'
			})} else {
				console.log('signup: creating new user');
				var newUser = new Users({
					email: req.body.email, 
					password: req.body.password
				});
				newUser.save(function(err) {
					if (err) {
						return res.status(400).json({
							success: false,
							message: 'save failed'
						})
					}
					// payload is a javascript object.  This is a prereq for using the 
					// expires in option
					var token = jwt.sign(
						{ email: newUser.email}, 
						secret.secret
					);
					console.log("sending cookie"); 
					res.json({message: "ok", token: token});
					// res.cookie('JWT', token);
					// res.status(201).json({
					// 	success: true, 
					// 	token: 'JWT ' + token
					// });
				});
			}
		});
		
	}
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/dashboard',
	failureRedirect: '/login',
	faulureFlash: true,
}))


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = router;
