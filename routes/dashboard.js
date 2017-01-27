var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var Jobs = require('../models/jobs.js')
var passport = require('passport');
var secret = require('../config/secret');
var Users = require('../models/users');
var jwt = require('jsonwebtoken');

var jwtAuth = passport.authenticate('jwt', 
	{ session: false, failureRedirect: '/login' });

router.get('/', jwtAuth, function(req, res, next) {
	allJobs()
		.then(function(allJobs) {
			res.render('dashboard', {
				allJobs: allJobs
			})
		}).catch(function(error) {console.log(error)})
})

function allJobs() {
	return new Promise (function(resolve, reject) {
		Jobs.find({}, function(err, data){
			if (err) {
				console.log(err)
				reject (new Error(msg))}
			else {
				//console.log(data)
				resolve(data)
			}
		})
	})
}



module.exports = router;