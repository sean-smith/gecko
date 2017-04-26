const request = require('request-promise')
const User = require('../models/user')
const Products = require('../models/products')


function cost_calculator(service, start_time, end_time, miles){
	var min_fare = 0
	var base_fare = 0
	var cost_p_min = 0.15
	var cost_p_mile = 0.90
	var booking_fee = 0
	if (service == "UberX"){
		min_fare = 5.15
		booking_fee = 1.65
	}
	else if (service == "UberXL"){
		base_fare = 1.0
		min_fare = 7.65
		cost_p_min = 0.30
		cost_p_mile = 1.55
		booking_fee = 1.65
	}
	else if (service == "UberSelect"){
		base_fare = 5.0
		min_fare = 10.65
		cost_p_min = 0.40
		cost_p_mile = 2.35
		booking_fee = 1.65
	}
	else if (service == "UberBlack"){
		base_fare = 8.0
		min_fare = 15.0
		cost_p_min = 0.45
		cost_p_mile = 3.55
		booking_fee = 0.0
	}
	else if (service == "UberSUV"){
		base_fare = 15.0
		min_fare = 25.0
		cost_p_min = 0.55
		cost_p_mile = 4.25
		booking_fee = 0.0
	}
	else{
		return "Unknown"
	}

	var cost =  (base_fare + (cost_p_min * end_time-start_time / 60.0) + (cost_p_mile * miles) + booking_fee)

	if (cost<min_fare){
		return min_fare
	}
	else{
		return cost
	}
}


function real_time(utc){
	var d = new Date(0);
	d.setUTCSeconds(utc);
	return d
}

function getRideDetails(req, next) {
	var dist = 0
	var index = 0

	// Done array makes sure everything is done before continuing
	var done = [];  
	for (var i = 0; i < req.user.trips.history.length; i++) {
		done.push(false)
	}

	req.user.trips.history.forEach(function (ride, index) {
		dist += ride.distance
		getProductsDescription(req, ride, function(description) {
			req.user.trips.history[index].description = description

			// Convert Time
			req.user.trips.history[index].date_time = real_time(ride.start_time)

			// Get Cost
			var cost = cost_calculator(service, ride.start_time, ride.end_time, ride.distance)
			req.user.trips.history[index].cost = cost

			done[index] = true
			var terminate = true
			for (var i = 0; i < done.length; i++) {
				if (!done[i]) {
					terminate = false
				}
			}
			if (terminate) {
				req.user.total_distance = dist
				return next(req)
			}
		})
	})
}

function getProductsDescriptionAPI(req, ride, next) {

	var params = {
		'latitude': ride.start_city.latitude, 
		'longitude': ride.start_city.longitude
	}

	api('v1.2/products', params, req.user.access_token, function(products) {
		return next(products)
	})
}

function getProductsDescription(req, ride, next) {
	// Check if in DB
	Products.findOne({'product_id': ride.product_id}, function (err, product) {

		// If product in db return it
		if (product) {
			return next(product)
		}

		// Make an API request
		getProductsDescriptionAPI(req, ride, function(products) {

			// Return Product
			var product = products.products.find(function(x) {
				return (x.product_id == ride.product_id)
			})

			next(product)

			// Insert into DB
			products.products.forEach(function(product, i) {
				Products.update({'product_id': product.product_id}, product, {upsert: true, setDefaultsOnInsert: true}, function(err, num) {
					if (err) console.log(err)
				})
			})
		})
	})
}

function getRidesAPI(req, next) {
	// Get History
	api('v1.2/history', {'limit': 50}, req.user.access_token, function(rides) {
		req.user.trips = rides
		getRideDetails(req, function(req) {
			return next(req)
		})
	})
}

function getRideData(req, res, next) {

	// Check if already set in session obj
	if (req.user.trips && req.user.total_distance) {
		return next(req, res)
	}

	// Look for info in DB
	User.findById(req.user.id, function (err, user) {

		// If it's there return it
		if (user.trips && user.total_distance) {
			req.user.trips = user.trips
			req.user.total_distance = user.total_distance
			return next(req, res)
		}

		// Otherwise fetch it from API
		getRidesAPI(req, function(req) {

			// Now save in DB
			User.update({ _id: req.user.id }, { 
				$set: { 
					'trips': req.user.trips, 
					'total_distance': req.user.total_distance 
				}
			}, function(err) {
				if (err) console.log(err)
				return next(req, res)
			})
		})
	})
}

function api(endpoint, params, access_token, next) {
	var options = {
		method: 'GET',
		uri: `https://api.uber.com/${endpoint}`,
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Accept-Language': 'en_US',
			'Content-Type': 'application/json'
		},
		qs: params,
		json: true
	}

	request(options).then((result) => {
		console.log(`${endpoint} Success`)
		return next(result)
	})
	.catch((err) => {
		console.log(`${endpoint} Failure`)
		console.log(err)
	})
}


module.exports = {
	getRideData: getRideData
}
