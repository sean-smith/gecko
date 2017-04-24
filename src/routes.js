// Setup all Routes

module.exports = function (app, passport, upload) {
	app.get('/', function (req, res) {
		console.log(req.user)
		if (req.isAuthenticated()) {
			res.render('index.html', {'name': req.user.email, 'profile_pic': req.user.profile_pic})
		} else {
			res.render('index.html')
		}
	})

	app.get('/login', passport.authenticate('uber', {scope: ['profile']}), function(req, res) {
		res.redirect('/')
	})
	 
	app.get('/login/callback', passport.authenticate('uber', { failureRedirect: '/'}), function (req, res) {
		res.redirect('/')
	})

	app.get('/search', function(req, res) {
		search.search(req, res, db)
	})
}