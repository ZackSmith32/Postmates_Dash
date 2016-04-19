var express = require('express');
var router = express.Router();
var fs = require('fs')
var mongoose = require('mongoose');
var Shifts = require('../models/shifts.js');
var Jobs = require('../models/jobs.js');
var moment = require('moment')

// whazz happenin.. create a record of the "post"ed content
// in the database.  Not exactly sure why requiring the schema
// file makes this possible..  The response is the
// the data in json format, which gets added to the database
// per what the fuck create is supposed to do.


// note to future: I should use this route to process all of
// the functions for the data base.


var isTrue = function(text) {
	if (text === 'true') {return true} 
		else {return false}
}




// render page
router.get('/', function(req, res, next) {

	
	
    Jobs.findOne({
        $query:{}, 
        $orderby:{shiftNumber: -1}},
        
        function(err, data) {
        	var shiftNumber
            if (err) {
                console.log(err)
                }
            else if (!data){
            	shiftNumber = 1}
            else {
                shiftNumber = data.shiftNumber
                console.log('shiftnum' , shiftNumber)} 

            res.render('addData', { 
        		title: 'Add Data', 
       			shiftNumber: shiftNumber})     
    })

    
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

	//radio and check box parsing

	// if pending tip = 0, otherwise take tip from form
	if (req.body.jobTipPending) {
		pending = true
		jobTip = 0
		console.log('job tip pending')
	} else { 
		pending = false
		jobTip = Number(req.body.jobTip)}

	console.log('this is pending' , pending)
	
	// calculated fields
	var jobTotal = jobTip + Number(req.body.jobPayout)

	var jobStart = req.body.jobStart
	var jobEnd = req.body.jobEnd
	var jobTime = moment(jobEnd).diff(moment(jobStart))
	var jobLengthHours = moment.duration(jobTime).as('hours')
	console.log('moment' , jobLengthHours)

	var canceled = isTrue(req.body.jobCanceled)

	var newJob = new Jobs({
		shiftNumber: req.body.shiftNumber,
		jobLengthHours: jobLengthHours,
		jobStart: req.body.jobStart,
		jobEnd: req.body.jobEnd,
		jobMerchant:  req.body.jobMerchant,
		jobPayout: Number(req.body.jobPayout),
		jobTip: jobTip,
		jobMultiplier: Number(req.body.jobMultiplier),
		jobTipPending: pending,
		jobTotal: jobTotal,
		jobCancel: canceled,
		jobPromotion: isTrue(req.body.jobPromotion),
	})

	newJob.save(function (err, job){
		if (err) console.log(err)
		else console.log(job)
		console.log('in save')
		res.redirect('/addData')
	})

	

})




module.exports = router;