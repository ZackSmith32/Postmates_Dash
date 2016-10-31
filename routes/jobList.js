var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var Jobs = require('../models/jobs.js')


router.get('/', function(req, res, next) {
	allJobs()
		.then(function(allJobs) {
			//console.log(allJobs)
			res.render('jobList', {
				allJobs: allJobs
			})
		}).catch(function(error) {console.log(error)})
})

router.get('/', function(req, res, next) {
	Jobs.update(
		{_id: req[0]},
		{$set: {
			jobPayout: req[1],
			jobTip: req[2]
		}},
		function(err) {
			if (err) {return console.log(err)}
			return 'success'
		}
	)
	res.send('success')
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