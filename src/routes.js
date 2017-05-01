const uber = require('./scripts/uber')
const credentials = require('./credentials')

// Setup all Routes
module.exports = function (app, passport) {
	app.get('/', function (req, res) {
		if (req.isAuthenticated()) {
			uber.getRideData(req, res, function(req, res) {
				res.render('index.html', {'user': req.user})
			})
		} else {
			res.render('login.html')
		}
	})

	app.get('/chart', function (req, res) {
		var endpoint = req.query.endpoint
		if (req.isAuthenticated() && endpoint != null) {
			uber.getRideData(req, res, function(req, res) {
				res.render('chart.html', {'user': req.user, 'endpoint': `/${endpoint}`})
			})
		} else {
			res.redirect('/')
		}
	})

	app.get('/trips', function (req, res) {
		if (req.isAuthenticated()) {
			uber.getRideData(req, res, function(req, res) {
				res.render('trips.html', {'user': req.user})
			})
		} else {
			res.redirect('/')
		}
	})

	app.get('/profile', function (req, res) {
		if (req.isAuthenticated()) {
			uber.getRideData(req, res, function(req, res) {
				res.render('profile.html', {'user': req.user})
			})
		} else {
			res.redirect('/')
		}
	})

	app.get('/map', function (req, res) {
		if (req.isAuthenticated()) {
			res.render('map.html', {'user': req.user, 'api_key': credentials.api_key})
		} else {
			res.redirect('/')
		}
	})

	app.get('/delete', function (req, res) {
		if (req.isAuthenticated()) {
			uber.deleteUser(req, res, function() {
				res.redirect('/')
			})
		} else {
			res.redirect('/')
		}
	})

	app.get('/day_of_week', function(req, res) {
		uber.getWeekData(req, res)
	})

	app.get('/month_of_year', function(req, res) {
		uber.getMonthData(req, res)
	})

	app.get('/map_data', function(req, res) {
		uber.getMapData(req, res)
	})

	app.get('/login', passport.authenticate('uber', {scope: ['profile', 'history']}), function(req, res) {
		res.redirect('/')
	})

	app.get('/login/callback', passport.authenticate('uber', { failureRedirect: '/'}), function (req, res) {
		res.redirect('/')
	})

	app.get('/logout', function (req, res) {
		req.logout()
		res.redirect('/')
	})

	app.get('/search', function(req, res) {
		search.search(req, res, db)
	})
}
