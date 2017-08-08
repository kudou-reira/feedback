//require original passport module
const passport = require('passport');

//exporting function

module.exports = (app) => {
	//watch for incoming requests with this method
	//scope asks google to give back profile and email information, pushes to callback function
	app.get('/auth/google', passport.authenticate('google', {
			scope: ['profile', 'email']
		}) 
	);
	//services passport REDIRECTS

	// now at callback function, ask Google for code
	//'code' gets sent in url, google strategy will see the code and try to handle
	// callback sends back an access token, this means it's successful

	//passport.authenticate is a MIDDLEWARE
	//afterwards, it passes on to the next middleware
	app.get('/auth/google/callback', 
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
