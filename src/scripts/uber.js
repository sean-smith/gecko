const request = require('request-promise')
const User = require('../models/user')
const Products = require('../models/products')
const get_cost = require('./cost_calculator')
var timezoneJS = require("timezone-js");
var tzdata = require("tzdata");

// Time Zone shit (Who knew Time Zones were so complex!!!)
var _tz = timezoneJS.timezone;
_tz.loadingScheme = _tz.loadingSchemes.MANUAL_LOAD;
_tz.loadZoneDataFromObject(tzdata);


function real_time(utc){
	var d = new Date(0);
	d.setUTCSeconds(utc);
	var dtz = new timezoneJS.Date(d, 'America/New_York');
	return dtz
}

function getRideDetails(req, next) {
	var dist = 0
	var total_cost = 0
	var index = 0

	// Done counter
	var done = 0

	req.user.trips.history.forEach(function (ride, index) {
		dist += ride.distance
		getProductsDescription(req, ride, function(description) {
			req.user.trips.history[index].description = description
			var cost = get_cost.cost_calculator(description.display_name, ride.start_time, ride.end_time, ride.distance)
			// Convert Time
			req.user.trips.history[index].date_time = real_time(ride.request_time)

			// Get Duration
			req.user.trips.history[index].duration = (ride.end_time - ride.start_time)

			// Get Cost
			req.user.trips.history[index].cost = cost
			total_cost += cost

			// Finish when we complete everything
			if (++done == req.user.trips.history.length) {
				req.user.total_distance = dist
				req.user.total_cost = total_cost
				console.log(total_cost)
				return next(req)
			}
		})
	})
}

function getProductsDescriptionAPI(req, ride, next) {

	api(`v1.2/products/${ride.product_id}`, {}, req.user.access_token, function(products) {
		return next(products)
	})
}

function getProductsDescription(req, ride, next) {
	// Check if in DB
	Products.findOne({'product_id': ride.product_id}, function (err, product) {

		// If product in db return it
		// if (product) {
		// 	return next(product)
		// }

		// Make an API request
		getProductsDescriptionAPI(req, ride, function(product) {

			// Return Product
			next(product)

			// Insert into DB
			Products.update({'product_id': product.product_id}, product, {upsert: true, setDefaultsOnInsert: true}, function(err, num) {
					if (err) console.log(err)
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

	/*
	// Check if already set in session obj
	if (req.user.trips && req.user.total_distance) {
		return next(req, res)
	}
*/
	// Look for info in DB
	User.findById(req.user.id, function (err, user) {

/*
		// If it's there return it
		if (user.trips && user.total_distance) {
			req.user.trips = user.trips
			req.user.total_distance = user.total_distance
			return next(req, res)
		}
*/
		// Otherwise fetch it from API
		getRidesAPI(req, function(req) {

			// Now save in DB
			User.update({ _id: req.user.id }, { 
				$set: { 
					'trips': req.user.trips, 
					'total_distance': req.user.total_distance, 
					'total_cost': req.user.total_cost
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
