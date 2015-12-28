var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var barData = require('../models/barData.js')

// router is a method of express
// it is an isolated instance of middleware
// http://expressjs.com/4x/api.html#router
var router = express.Router();

// ooook her we go.. index.ejs sends get request to route.  Upon 
// request we search barData, but don't have any conditions just a 
// callback so it passess all records to the callback in "data"
// which is then used in the render
router.get('/', function(req, res, next) {	
	barData.find(function(err, data) {
		if (err) return next(err);
		res.render('index', { 
	  	title: 'Place Holder',
	  	bars: data
  	});
	});
});

router.post('/', function(req, res, next) {
	obj = req.body
	barDayFilters = obj['barDayFilters[]']
	barAreaFilters = obj['barAreaFilters[]']
	
	//query database and send results back
	barData.find({barDay: {$in: barDayFilters}}, function(err, docs){
			console.log('this is the query result ' + docs)
			res.send(docs)
		})

})

// note: when ajax is encoding the information to be sent
// it adds [] to the end of the key name, if the value for
// that key is an array.  It does this to help differentiate
// between an array and a primative value.

module.exports = router;
