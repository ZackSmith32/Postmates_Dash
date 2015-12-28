var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); // logs get requests and shit in terminal
var cookieParser = require('cookie-parser');
var fs = require('fs');
// bodyParser is middleware that lets you parse a request ".body."
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// this is feature of mongoose, that you don't need to do
// an elaborate code to connect to the database.
mongoose.connect('mongodb://localhost:27017/barData', function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

// these variables contain the path for each route
var index = require('./routes/index');
var barAdd = require('./routes/barAdd');
var add = require('./routes/add');
var barData = require('./routes/barData');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


    // what are the params for app.use?
    // how does express.static work?
    // does the ordering of app.use affect the order they are executed in?
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/barAdd', barAdd);
app.use('/add', add);
app.use('/barData', barData)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;


