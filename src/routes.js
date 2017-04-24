const uber = require('./scripts/uber')
// Setup all Routes

module.exports = function (app, passport, upload) {
	app.get('/', function (req, res) {
		if (req.isAuthenticated()) {
			res.render('index.html', {'name': req.user.first_name, 'profile_pic': req.user.picture})
		} else {
			res.render('index.html')
		}
	})

	app.get('/rides', function(req, res) {
		if (req.isAuthenticated()) {
			uber.get_rides(req.user, res)
		} else {
			res.redirect('/')
		}
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