var express = require('express');
var router = express.Router();
var fs = require('fs')
var mongoose = require('mongoose');
var Shifts = require('../models/shifts.js');
var Jobs = require('../models/jobs.js');
var moment = require('moment')



// render page
router.get('/', function(req, res, next) {

	// shiftNumberMax(function jobData(shiftNumber) {
			
	// 	Jobs.find({ shiftNumber: shiftNumber},
	// 		function(err, data) {
	// 			if (err) console.log(err)
	// 			res.render(
	// 				'addData', { 
	// 		        title: 'Add Data', 
	// 		       	shiftNumber: shiftNumber,
	// 		       	jobData: data})
			
	// 	})
	// })    

	shiftNumberMax(req, res, next)
	jobsFromShift(req, res, next)
	merchantList(req, res, next)
	renderPage(req, res)




});

// if new shift then add 1 to shift number
router.post('/', function(req, res, next) {
	
	if(req.body.newShift) {
		res.render('addData', { 
        	title: 'Add Data', 
       		shiftNumber: Number(req.body.shiftNumber)+1})
		
	} else next()

})

//save 'Shift' data to database
// router.post('/', function(req, res, next) {

//     console.log(req.body.shiftNumber)

// 	var newShift = new Shifts({
// 		shiftNumber: req.body.shiftNumber,
// 		shiftMiles: req.body.shiftMiles
// 	})

// 	newShift.save(function (err, shift){
// 		if (err) console.log(err);
// 		else console.log(shift)
// 	})
// 	next()
// })

// save 'Job' data to database
router.post('/', function(req, res, next) {

	console.log('post job, route: addData')
	var pending
	var jobTip

	// if pending tip = 0, otherwise take tip from form
	if (req.body.jobTipPending) {
		jobTip = 0
	} else { 
		jobTip = Number(req.body.jobTip)}
	
	// calculated fields
	var jobTotal = jobTip + Number(req.body.jobPayout)
	
	var jobStart = req.body.jobStart
	var jobEnd = req.body.jobEnd
	var jobTime = moment(jobEnd).diff(moment(jobStart))
	var jobLengthHours = moment.duration(jobTime).as('hours')
	console.log('moment' , jobLengthHours)

	var newJob = new Jobs({
		shiftNumber: req.body.shiftNumber,
		jobLengthHours: jobLengthHours,
		jobStart: req.body.jobStart,
		jobEnd: req.body.jobEnd,
		jobMerchant:  req.body.jobMerchant,
		jobPayout: Number(req.body.jobPayout),
		jobTip: jobTip,
		jobMultiplier: Number(req.body.jobMultiplier),
		jobTipPending: isTrue(req.body.jobTipPending),
		jobTotal: jobTotal,
		jobCancel: isTrue(req.body.jobCancele),
		jobPromotion: isTrue(req.body.jobPromotion),
		jobTest: isTrue(req.body.jobTest),
	})

	newJob.save(function (err, job){
		if (err) console.log(err)
		else console.log(job)
		console.log('in save')
		res.redirect('/addData')
	})

})

router.delete('/', function( req, res, next) {
	console.log(req.body._id)
	Jobs.findByIdAndRemove( req.body._id, function(err) {
		if (err) console.log(err)
		console.log('deleted ' + req.body._id)
	})
	res.send('success')
})

// function declerations
function isTrue(field) {
	var bool = field
	if (bool) {
		bool = true
		return bool} 
	else {
		bool = false	
		return bool}
}

// function shiftNumberMax(callback) {
// 	Jobs.findOne({
// 		$query: {}, 
// 		$orderby:{shiftNumber: -1}}, 
// 		function(err,data) {
// 			if (err) {
// 				console.log(err)}
// 			else {callback(data.shiftNumber)}
// 		})
// }




module.exports = router;