var express = require('express');

//router is a method of express
// it is an isolated instance of middleware
// http://expressjs.com/4x/api.html#router
var router = express.Router();

var barList = []

/* GET home page. */
router.post('/add', function(req, res) {
  var newBar = {
  	barName: req.body.newBarName}

  barList.push(newBar)

  res.redirect('/')
});

module.exports = router;