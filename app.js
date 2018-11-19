'use strict'
const express = require('express'),
	  pug = require('pug'),
	  bodyParser = require('body-parser'),
	  twitter_Module = require(`./modules/twitter_Middleware.js`),
	  config = require('./config.json');

const Twit = require('twit'),
	  Twitter = new Twit(config);

const app = express();
const twitterApi = twitter_Module(config);

app.set(`view engine`, `pug`) /* Set pug/Jade as the view engine */
app.use(`/static`, express.static(`public`));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

const errMessage = `Cannot connect to the Server. Please try again later.`;

// GET /
app.get('/', ( req, res, next ) => {
	twitterApi()
		.then(data => {
			const [ user, timeline, followers, directMessages ] = data;
			res.locals = { user, timeline, followers, directMessages }
			res.render(`index`)
		})
		.catch(() => {
			const err = new Error(errMessage);
			err.status = 500;
			next(err);
		});
});

//Post Tweets
app.post('/', ( req, res, next ) => {
	const message = req.body.tweet;

	Twitter.post('statuses/update', { status: message }, function(err, data, response) {
		res.redirect('/')
	})
	.catch(() => {
		const err = new Error(errMessage);
		err.status = 500;
		next(err);
	});
});

//Handle Errors
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(err.status);
	res.render('error');
});

/* Evaluate to 3000 unless we're deploying the out to a production environment. */
const port = 3000;
app.listen(3000, () => console.log(`Server is running on http://localhost:${port}/`));