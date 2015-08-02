/**
 * Created by chris on 8/2/15.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
    db: 'mongodb://' + process.env.MONGODB_DEV_USER_NAME +':' + process.env.MONGODB_DEV_PASS + '@' + process.env.MONGODB_DEV_ADDRESS,
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: 'Facebook Application ID',
        clientSecret: 'Facebook Application Secret',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    twitter: {
        clientID: 'Twitter Application ID',
        clientSecret: 'Twitter Application Secret',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    },
    google: {
        clientID: 'Google Application ID',
        clientSecret: 'Google Application Secret',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
};