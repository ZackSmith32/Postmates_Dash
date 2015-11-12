var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

//router is a method of express
// it is an isolated instance of middleware
// http://expressjs.com/4x/api.html#router
var router = express.Router();

// load JSON before rendering
// router.get('/', function(req, res, next) {
//   fs.readFile( 'posts.json', function(err, data) {
//     res.locals.posts = JSON.parse(data)
//     console.log(posts)
//     next()
//   })
// })

// set up local variable

/* GET home page. */
router.get('/', function(req, res, next) {
	// fs.readFile( 'posts.json', function(err, data) {
 	// bars = JSON.parse(data)
 	// })
	

  res.render('index', { 
  	title: 'Place Holder',
  	});
});


module.exports = router;
