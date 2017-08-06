//server-side: common modules use 'require'

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./config/keys');

const app = express();

// client ID: 317830939684-7lk7gihk3aifpv2k5bspove2qh9ikh03.apps.googleusercontent.com
// client secret: ZOVFND7Ag62hzfSNucg9PFdr

//passport, make use of this Google oauth
passport.use(new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken) => {
		console.log(accessToken);
	})
);

console.log('Server running');

//watch for incoming requests with this method
//scope asks google to give back profile and email information
app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile', 'email']
	}) 
);

//'code' gets sent in url, google strategy will see the code and try to handle
// callback sends back an access token, this means it's successful
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);