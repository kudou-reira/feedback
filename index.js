//server-side: common modules use 'require'
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
//nothing being returned from passport.js, so just require it
require('./models/user');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

//use cookieSession middleware
app.use(
	cookieSession({
		maxAge: 30*24*60*60*1000,
		keys: [keys.cookieKey]
	})
);

//tell passport to use middleware

app.use(passport.initialize());
app.use(passport.session());

// client ID: 317830939684-7lk7gihk3aifpv2k5bspove2qh9ikh03.apps.googleusercontent.com
// client secret: ZOVFND7Ag62hzfSNucg9PFdr

//returns function from authroutes
//similar to createStore in redux
require('./routes/authRoutes')(app);

console.log('Server running');

const PORT = process.env.PORT || 5000;
app.listen(PORT);