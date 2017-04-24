const credentials = require('../credentials')
const uberStrategy = require('passport-uber-v2').Strategy
const User = require('../models/user')

// Setup Passport Authentication
module.exports = function (passport) {

	passport.use(new uberStrategy({
		clientID: credentials.client_id,
		clientSecret: credentials.client_secret,
		callbackURL: "http://localhost:8080/login/callback"
	},
	function(accessToken, refreshToken, profile, done) {
		var user = profile;
		user.accessToken = accessToken;

		var new_user = new User()
		new_user.first_name = profile.first_name
		new_user.last_name = profile.last_name
		new_user.email = profile.email
		new_user.accessToken = accessToken
		new_user.refreshToken = refreshToken
		new_user.id = profile.uuid
		
		new_user.save(function (err) {
			if (err) console.log(err)
			return done(null, new_user)
		})
	}
	))

	// "Why do we need these two functions?" -> https://github.com/jaredhanson/passport#sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	})

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) { 
			done(err, user)
		})
	})
}