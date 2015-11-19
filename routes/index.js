var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var barList = require('../test.json')

// router is a method of express
// it is an isolated instance of middleware
// http://expressjs.com/4x/api.html#router
var router = express.Router();

router.get('/', function(req, res, next) {
	// $(function() {
	// 	console.log($('test'))
	// });
  res.render('index', { 
  	title: 'Place Holder',
  	bars: barList
  });
});

router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e, docs) {
		console.log(docs)
		res.render('userList', {
			'userlist' : docs,
			title: 'Place Holder'
		});
	});
});


module.exports = router;
