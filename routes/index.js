var express = require('express');

//router is a method of express
// it is an isolated instance of middleware
// http://expressjs.com/4x/api.html#router
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Place Holder', bar: barList });
});

module.exports = router;
