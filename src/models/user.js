var mongoose = require('mongoose')

var user = mongoose.Schema({
	'first_name': String,
	'last_name': String,
	'picture': String,
	'access_token': String,
	'refresh_token': String,
	'rider_id': String,
	'email': String,
	'days_of_week': mongoose.Schema.Types.Mixed,
	'months_of_year': mongoose.Schema.Types.Mixed,
	'total_distance': Number,
	'total_money': Number,
	'total_cost' : Number,
	'trips': mongoose.Schema.Types.Mixed,
})

module.exports = mongoose.model('User', user)
