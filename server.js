// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_PORT = process.env.NODE_PORT || 3000;

// Load the module dependencies
var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');

// Create a new Mongoose connection instance
var db = mongoose();

// Create a new Express application instance
var app = express();

// Configure the Passport middleware
var passport = passport();

// Use the Express application instance to listen to the '3000' port
app.listen(process.env.NODE_PORT);

// Log the server status to the console
console.log('Node Server running on port ' + process.env.NODE_PORT);
console.log('Env is ' + process.env.NODE_ENV);

if (process.env.NODE_ENV == 'development')
{
	console.log('Mongo user name is: ' + process.env.MONGODB_DEV_USER_NAME);
	console.log('Mongo pass is: ' + process.env.MONGODB_DEV_PASS);
	console.log('Mongo address is: ' + process.env.MONGODB_DEV_ADDRESS);
} else if (process.env.NODE_ENV == 'test')
{
	console.log('Mongo user name is: ' + process.env.MONGODB_TEST_USER_NAME);
	console.log('Mongo pass is: ' + process.env.MONGODB_TEST_PASS);
	console.log('Mongo address is: ' + process.env.MONGODB_TEST_ADDRESS);
}



// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
