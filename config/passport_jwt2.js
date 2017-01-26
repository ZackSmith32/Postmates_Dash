var passportJwt = require("passport-jwt");
var ExtractJwt = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;
var Users = require("../models/users.js");
var secret = require("./secret.js");

var params = {};
params.jwtFromRequest = ExtractJwt.fromAuthHeader();
params.secretOrKey = secret.secret;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = secret.secret;

module.exports = (function( passport ) {
	
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
})



