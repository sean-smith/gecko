var mongoose = require('mongoose')

var user = mongoose.Schema({
	'first_name': String,
	'last_name': String,
	'picture': String,
	'access_token': String,
	'refresh_token': String,
	'rider_id': String,
	'email': String,
	'distance': Number,
	'money': Number
})

module.exports = mongoose.model('User', user)
