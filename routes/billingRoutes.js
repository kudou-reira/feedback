const keys = require('../config/keys');

var stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

//express doesn't parse automatically on post request
module.exports = (app) => {
	//not calling it right away
	//only runs any time 'post' is called
	app.post('/api/stripe', requireLogin, async (req, res) => {
		//stripe.charges.create
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		// console.log(charge);
		req.user.credits += 5;
		const user = await req.user.save();
		res.send(user);
		//send user model to reducer
	});
};