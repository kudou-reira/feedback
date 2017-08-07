const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//serializeUser takes the return 'user' from GoogleStrategy
passport.serializeUser((user, done) => {
	//oauth purpose is to check and let someone sign in
	//after oauth, we use own IDs from mongo
	//user.id = "_id[$oid]l" in mongo database
	done(null, user.id)
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
			done(null, user)
		});
});


//passport, make use of this Google oauth
//access token expores after accessed
passport.use(new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, 
	(accessToken, refreshToken, profile, done) => {
		// console.log('accessToken: ', accessToken);
		// console.log('refreshToken: ', refreshToken);
		// console.log('profile: ', profile);
		User.findOne({ googleId: profile.id })
			.then((existingUser) => {
				if(existingUser) {
					done(null, existingUser);
				}

				else{
					//both users are the same model instance, but 'user' is the newer one
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user));
				}
			})
		
	})
);
