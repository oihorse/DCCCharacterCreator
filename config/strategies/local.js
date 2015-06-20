// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

// Create the Local strategy configuration method
module.exports = function() {
	// Use the Passport's Local strategy 
	passport.use(new LocalStrategy(function(email, password, done) {
		// Use the 'User' model 'findOne' method to find a user with the current username
		User.findOne({
			email: email
		}, function(err, user) {
			// If an error occurs continue to the next middleware
			if (err) {
				console.log("Error in err, user");
				return done(err);
			}
			
			// If a user was not found, continue to the next middleware with an error message
			if (!user) {
				console.log("Error, user not found");
				return done(null, false, {
					message: 'Unknown email'
				});
			}

			// If the passport is incorrect, continue to the next middleware with an error message
			if (!user.authenticate(password)) {
				console.log("Error, password didn't work");
				return done(null, false, {
					message: 'Invalid password'
				});
			}
			
			// Otherwise, continue to the next middleware with the user object
			return done(null, user);
		});
	}));
};
