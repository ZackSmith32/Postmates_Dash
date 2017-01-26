var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); // logs get requests and shit in terminal
var cookieParser = require('cookie-parser');
var fs = require('fs');
// bodyParser is middleware that lets you parse a request ".body."
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var app = express();

// connect to database
mongoose.connect('mongodb://zack_smith:Killa1kaz@ds139277.mlab.com:39277/postmatesdash', function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

// these variables contain the path for each route
var index = require('./routes/index');
var addData = require('./routes/addData');
var dashboard = require('./routes/dashboard');
var jobList = require('./routes/jobList');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// modules for jwt authorization
var passport = require("passport");
var passportJwt = require("passport-jwt");
var ExtractJwt = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;
var Users = require("./models/users.js");
var secret = require("./config/secret.js");

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = secret.secret;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    Users.findOne({email: jwt_payload.email}, function(err, user) {
        console.log('auth strategy');
        if (user) {
            next( null, user);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);
app.use(passport.initialize());

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message: "Success! You can not see this without a token"});
});



// require('./config/passport_jwt2')(passport);
// app.get('/', passport.authenticate('jwt', {session: false}), function(req, res) {
//   console.log("'/' route");
//   res.redirect('/dashboard');
// });

// passport stuff
// app.use(session({ 
//   secret: 'supersecret',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.session());
// app.use(flash());

// designate which route to use for specific requests
app.use('/', index);
app.use('/addData', addData);
app.use('/dashboard', dashboard);
app.use('/jobList', jobList);


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


