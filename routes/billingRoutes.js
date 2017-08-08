const keys = require('../config/keys');

var stripe = require("stripe")(keys.stripeSecretKey);

//express doesn't parse automatically on post request
module.exports = (app) => {
	app.post('/api/stripe', (req, res) => {

	});
};