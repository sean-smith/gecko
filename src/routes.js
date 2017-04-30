const uber = require('./scripts/uber')

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

	app.get('/profile', function (req, res) {
		if (req.isAuthenticated()) {
			uber.getRideData(req, res, function(req, res) {
				res.render('profile.html', {'user': req.user})
			})
		} else {
			res.redirect('/')
		}
	})

	app.get('/day_of_week', function(req, res) {
		uber.getWeekData(req, res)
	})

	app.get('/day_of_month', function(req, res) {
		uber.getMonthData(req, res)
	})

	app.get('/login', passport.authenticate('uber', {scope: ['profile', 'history', 'request_receipt', 'all_trips']}), function(req, res) {
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