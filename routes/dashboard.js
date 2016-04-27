var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var barData = require('../models/barData.js')


router.get('/', function(req, res, next) {
	
	
	res.render('dashboard', {
		data: sample_json.js
	})
})

module.exports = router;