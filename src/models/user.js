var mongoose = require('mongoose')

var user = mongoose.Schema({
	'first_name': String,
	'last_name': String,
	'picture': String,
	'access_token': String,
	'refresh_token': String,
	'rider_id': String,
	'email': String,
	'total_distance': Number,
	'total_money': Number,
	'total_cost' : Number,
	'trips': mongoose.Schema.Types.Mixed,
})

module.exports = mongoose.model('User', user)
