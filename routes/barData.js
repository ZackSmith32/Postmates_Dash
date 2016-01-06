var express = require('express');
var router = express.Router();
var fs = require('fs')
var mongoose = require('mongoose');
var barData = require('../models/barData.js');

// whazz happenin.. create a record of the "post"ed content
// in the database.  Not exactly sure why requiring the schema
// file makes this possible.. Anywho req.body parses the data.. 
// again not sure why this is necessary.  The response is the
// the data in json format, which gets added to the database
// per what the fuck create is supposed to do.


// note to future: I should use this route to process all of
// the functions for the data base.

router.post('/', function(req, res, next) {
	console.log('at barData for posting')
	console.log(req.body)
	barData.create(req.body, function (err, bar) {
		if (err) return ('error on bardata');
		console.log('bar data post')
	})
})

module.exports = router;