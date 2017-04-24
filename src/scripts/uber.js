var request = require('request-promise')


function get_receipt(ride_id, access_token, res) {
	var options = {
		method: 'GET',
		uri: 'https://api.uber.com/v1.2/requests/'+ride_id+'/receipt',
		headers: {
			'Authorization': "Bearer " + access_token,
			'Accept-Language': 'en_US',
			'Content-Type': 'application/json'
		}
	}

	request(options).then((rides) => {
		console.log("success")
		res.send(rides)
	})
	.catch((err) => {
		console.log(err)
		console.log("failure")
	})
}

function get_rides(user, res) {
		var options = {
			method: 'GET',
			uri: 'https://api.uber.com/v1.2/history',
			headers: {
				'Authorization': "Bearer " + user.access_token,
				'Accept-Language': 'en_US',
				'Content-Type': 'application/json'
			}
		}

		request(options).then((rides) => {
			console.log("success")
			get_receipt(rides[0]['request_id'], user.access_token, res)
		})
		.catch((err) => {
			console.log(err)
			console.log("failure")
		})
}


module.exports = {
	get_rides: get_rides,
	get_receipt: get_receipt
}
