`use strict`;
const Twit = require('twit'),
	  config = require('../config.json');

const twitterAPI = (config) => {
	const Twitter = new Twit(config);

	const convert_into_hours = time => new Date(time).getHours();

	const lookUp_user_info = (userId) => Twitter
					.get('users/lookup', { user_id: userId })
					.then(user => ({
						user_name: user.data[0].name,
						screen_name: user.data[0].screen_name,
						profile_image_url: user.data[0].profile_image_url,
						created_at: convert_into_hours(user.data[0].created_at)
					}));

	//Get User Information
	const getUser = () => Twitter
					.get('account/settings')
					.then(user => user.data.screen_name)
					.then(user_screen_name => Twitter.get('users/show', { screen_name: user_screen_name }))
					.then(userData => ({
						id: userData.data.id_str,
						screen_name: userData.data.screen_name,
						profile_img: userData.data.profile_image_url_https,
						banner_img: userData.data.profile_banner_url,
						profile_use_background_image: userData.data.profile_use_background_image
					}));

	// Get the most recent tweets from your timeline 
	const getTimeline = () => Twitter
							.get('statuses/home_timeline', { count: 20 })
							.then(result => result.data.map(tweet => ({
								user_name: tweet.user.name,
								screen_name: tweet.user.screen_name,
								description: tweet.text,
								profile_image_url: tweet.user.profile_image_url,
								timestamp: convert_into_hours(tweet.created_at),
								retweet: tweet.retweet_count,
								likes: tweet.favorite_count
							})));

	//Get the most recent friends you'er following.
	const getFollowers = () => Twitter
							.get('friends/list', { count: 20 })
							.then(result => result.data.users.map(follower => ({
								 profile_image_url: follower.profile_image_url,
								 name: follower.name,
								 screen_name: follower.screen_name,
								 following: follower.following
							})));

	// Get the most recent direct messages.
	const getDirectMessages = () => Twitter
							.get('direct_messages/events/list', { count: 20})
							.then(result => {
								const users_ids  = result.data.events.map(user => user.message_create.sender_id);

								return Promise
										.all(users_ids.map(id => lookUp_user_info(id)))
										.then(user => {
											const userId = Object.assign({}, user);

											let count = 0;

											const messageResult = result.data.events
												.map(message_Obj => ({
													id: message_Obj.message_create.sender_id,												
									                user: userId[count++],
									                message: message_Obj.message_create.message_data.text,
									                messageRecipient_id: message_Obj.message_create.target.recipient_id,
												}));

											return messageResult.reverse();	
										});
							});

	const getTwitterAPI = () => Promise.all([ getUser(), getTimeline(), getFollowers(), getDirectMessages() ]);
	return getTwitterAPI;
};

module.exports = twitterAPI;