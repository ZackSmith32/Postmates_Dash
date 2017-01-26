var passportJwt = require("passport-jwt");
var ExtractJwt = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;
var Users = require("../models/users.js");
var secret = require("./secret.js");

var params = {};
params.jwtFromRequest = ExtractJwt.fromAuthHeader();
params.secretOrKey = secret.secret;

module.exports = (function( passport ) {
	
	var authStrategy = new JwtStrategy(params, function(jwt_payload, next) {
		console.log('payload received', jwt_payload);
	

		Users.findOne({id: jwt_payload.email}, function(err, user) {
			if (user) {
				next( null, user);
			} else {
				next(null, false);
			}
		});
	});

	passport.use(authStrategy);
})