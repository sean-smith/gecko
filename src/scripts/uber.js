var request = require('request-promise')
const User = require('../models/user')

function get_receipt(ride_id, access_token, res) {
	var options = {
		method: 'GET',
		uri: 'https://api.uber.com/v1.2/requests/'+ride_id+'/receipt',
		headers: {
			'Authorization': "Bearer " + access_token,
			'Accept-Language': 'en_US',
			'Content-Type': 'application/json'
		},
		json: true
	}

	request(options).then((rides) => {
		console.log("success")
		res.send(JSON.stringify(rides))
	})
	.catch((err) => {
		console.log(err)
		console.log("failure")
	})
}

function get_total_distance(rides) {
	var dist = 0
	console.log(rides)
	for (var ride in rides) {
		dist += rides[ride].distance
	}
	return dist
}



function get_rides(req, res) {
	var options = {
		method: 'GET',
		uri: 'https://api.uber.com/v1.2/history',
		headers: {
			'Authorization': "Bearer " + req.user.access_token,
			'Accept-Language': 'en_US',
			'Content-Type': 'application/json'
		},
		qs: {
			'limit': 50
		},
		json: true
	}

	request(options).then((rides) => {
		console.log("success")
		var distance = get_total_distance(rides.history)
		req.user.distance = distance

		// get_receipt(rides.history[0].request_id, user.access_token, res)
	})
	.catch((err) => {
		console.log(err)
		console.log("failure")
	})
}

function get_and_cache(user, res) {

	// User.get();


	User.update({ _id: user.id }, { $set: { distance: distance }}, function() {
		console.log('here')
		res.redirect('/')
	})
}


module.exports = {
	get_rides: get_rides,
	get_receipt: get_receipt
}
