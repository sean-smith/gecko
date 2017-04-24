var request = require('request-promise')



module.exports = {

	get_rides: function (user, res) {
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
			res.send(rides)
		})
		.catch((err) => {
			console.log(err)
			console.log("failure")
		})

		// return "hi"
	}

	get_receipt: function(ride_id, res)
}
