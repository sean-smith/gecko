var mongoose = require('mongoose')

var user = mongoose.Schema({
	'first_name': String,
	'last_name': String,
	'picture': String,
	'access_token': String,
	'refresh_token': String,
	'rider_id': String,
	'email': String,
	'days_of_week': {
		'monday': Number, 
		'tuesday': Number,
		'wednesday': Number, 
		'thursday': Number, 
		'friday': Number, 
		'saturday': Number, 
		'sunday': Number
	},
	'months_of_year': {
		'january': Number, 
		'february': Number,
		'march': Number, 
		'april': Number, 
		'may': Number, 
		'june': Number, 
		'july': Number,
		'august': Number, 
		'september': Number, 
		'october': Number, 
		'november': Number,
		'december': Number
	},
	'total_distance': Number,
	'total_money': Number,
	'total_cost' : Number,
	'trips': mongoose.Schema.Types.Mixed,
})

module.exports = mongoose.model('User', user)
