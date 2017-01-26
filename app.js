// man giteveryday
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); // logs get requests and shit in terminal
var cookieParser = require('cookie-parser');
var fs = require('fs');
// bodyParser is middleware that lets you parse a request ".body."
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// flash allows you to pop up messages.. not sure if going to keep
// var flash = require('connect-flash');
// var session = require('express-session');
// validates jwt's
var jwt = require('jsonwebtoken');

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

var passport = require('passport');
var passportJwt = require("passport-jwt");
var ExtractJwt = require("passport-jwt").ExtractJwt;
var JwtStrategy = require("passport-jwt").Strategy;
var Users = require("./models/users.js");
var secret = require("./config/secret.js");

// var params = {};
// params.jwtFromRequest = ExtractJwt.fromAuthHeader();
// params.secretOrKey = secret.secret;

// var authStrategy = new JwtStrategy(params, function(jwt_payload, next) {
//     console.log('auth strategy')
//     // console.log('payload received', jwt_payload);

//     Users.findOne({id: jwt_payload.email}, function(err, user) {
//         console.log('auth strategy');
//         if (user) {
//             next( null, user);
//         } else {
//             next(null, false);
//         }
//     });
// });
passport.use(
    new JwtStrategy(
        {   jwtFromRequest: ExtractJwt.fromAuthHeader(),
            secretOrKey: secret.secret }, 
        function(jwt_payload, done) {
            console.log('auth strategy payload =', payload)
            done( null, {email: 'noDB'})
            // Users.findOne({id: jwt_payload.email}, function(err, user) {
            //     console.log('auth strategy');
            //     if (user) {
            //         done( null, user );
            //     } else {
            //         done( null, false );
            //     }
            // })
        }
    )
);
app.use(passport.initialize());

// app.get("/secret", function(req , res, next) {
//     var pyld = ExtractJwt.fromAuthHeader(req);
//   console.log('/secret jwt payload =', pyld);
//   next();
// });
app.get(    '/secret' ,
            function(req , res, next) {
                console.log("in secret before passport");
                passport.authenticate('jwt', function(err, user, info) {
                    res.json({message: "made it past passport"});
                })
                res.json({message: "not authenticated"})
                // console.log(req.header);
                // res.send('test text');
                // res.json({ message: 'success! you can not see this without a token'});
            }
        );

// app.get("/secret", function(req , res, next) {
//   res.json({ message: 'second get'});
// });


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


