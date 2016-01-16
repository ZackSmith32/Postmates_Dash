var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var barData = require('../models/barData.js')


router.get('/:barLink', function(req, res, next) {
	barData.find({barLink: req.params.barLink}, function(err, data) {
		if (err) console.log(err);
		console.log(data)
		res.render('barDetails', {
			title: 'Bar Details',
			barData: data
		})
	})
})

module.exports = router;