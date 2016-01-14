var express = require('express');
var router = express.Router();

/* GET addBar page. */
router.get('/', function(req, res, next) {
  res.render('barAdd', { 
  	title: 'Add a Bar' });
  console.log('got to Bar Add')
});



module.exports = router;
