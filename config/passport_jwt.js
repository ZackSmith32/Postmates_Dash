// var passport = require("passport");
var passportJwt = require("passport-jwt");
// var ExtractJwt = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;
var Users = require("../models/users.js");
var secret = require("./secret.js");


module.exports = function(passport) {
	var cookieExtractor = function(req) {
    	var token = null;
    	if (req && req.cookies)
    	{
       		token = req.cookies['JWT'];
   		}
   		console.log("token in authenticate strategy =", token);
    	return token;
	};
	var params = {
		session: false,
		secretOrKey: secret.secret,
		jwtFromRequest: cookieExtractor
	};

	passport.use('jwt', new JwtStrategy(params, function(payload, done) {
		console.log('jwt strategy: payload: ');
		Users.findOne({id: payload.email}, function(err, user) {
			console.log("looking for user");
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				console.log('user not in database');
				done(null, false);
			}
		});
	}));
	console.log("in strategy");
}