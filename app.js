var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); 
var cookieParser = require('cookie-parser');
var fs = require('fs');
// bodyParserd is middleware that lets you parse a request ".body."
var bodyParser = require('body-parser');

// these variables contain the path for each route
var routes = require('./routes/index');
var about = require('./routes/about');
var add = require('./routes/add')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// load posts from JSON
app.all('*', function(req, res, next) {
  fs.readFile( 'bars.json', function(err, data) {
    if (err) {console.log('JSON error')}
    res.locals.bars = JSON.parse(data)
    next()
  })
})

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

app.use('/', routes);
app.use('/about', about);
app.use('/add', add)






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
