var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('about', { 
  	title: 'About' });
  console.log('got to about')
});

router.post('/about', function(req, res) {
	var newBar = req.body.newBarName

  // var newBar = {
  // 	barName: req.body.newBarName}

  // barList.push(newBar)
  console.log('got to post in about')
  res.redirect('/')
});

module.exports = router;
