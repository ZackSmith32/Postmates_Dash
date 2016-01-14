var express = require('express');
var router = express.Router();
var fs = require('fs')
var mongoose = require('mongoose');
var barData = require('../models/barData.js');

// whazz happenin.. create a record of the "post"ed content
// in the database.  Not exactly sure why requiring the schema
// file makes this possible..  The response is the
// the data in json format, which gets added to the database
// per what the fuck create is supposed to do.


// note to future: I should use this route to process all of
// the functions for the data base.

router.post('/', function(req, res, next) {
	console.log('at barData')
	var newBar = new barData(req.body)

	newBar.save(function (err, data){
		if (err) console.log(err);
		else console.log('Saved', newBar)
		res.send('')	
	})
	
})

module.exports = router;