const uber = require('./scripts/uber')

// Setup all Routes
module.exports = function (app, passport) {
	app.get('/', function (req, res) {
		if (req.isAuthenticated()) {
			uber.getRideData(req, res, function(req, res) {
				res.render('new.html', {'user': req.user})
			})
		} else {
			res.render('new.html')
		}
	})

	app.get('/login', passport.authenticate('uber', {scope: ['history', 'request_receipt', 'profile']}), function(req, res) {
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