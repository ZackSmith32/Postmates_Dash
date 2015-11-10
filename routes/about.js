var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('about', { 
  	title: 'About' });
});

router.post('/add', function(req, res) {
	console.log(req.body.newBarName) 

  // var newBar = {
  // 	barName: req.body.newBarName}

  // barList.push(newBar)

  // res.redirect('/')
});

module.exports = router;
