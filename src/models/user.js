var mongoose = require('mongoose')

var user = mongoose.Schema({
	first_name: String,
	last_name: String,
	access_token: String,
	refresh_token: String
})

module.exports = mongoose.model('User', user)