// Setup all Routes

module.exports = function (app, passport, upload) {
	app.get('/', function (req, res) {
		res.render('index.html')
	})

	app.get('/auth/uber',
	  passport.authenticate('uber', { scope: ['profile'] })
	)
	 
	app.get('/auth/uber/callback', passport.authenticate('uber', { failureRedirect: '/'}), function (req, res) {
		res.redirect('/')
	})

	app.get('/search', function(req, res) {
		search.search(req, res, db)
	})
}