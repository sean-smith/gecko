var express = require('express')
var nunjucks = require('nunjucks')
var app = express()

// Configure Templating Engine Nunjucks
nunjucks.configure('pages', {
    autoescape: true,
    express: app
})

app.get('/', function (req, res) {
  res.render('index.html')
})

app.get('/search', function(req, res) {

	var year = req.query.year;
	var make = req.query.make;
	var model = req.query.model;

	cars = [
		{
			name: "Fiat"
		}, 
		{
			name: "Chrysler"
		},
		{
			name: "Ferrari"
		}
	];

	res.render('index.html', { cars: JSON.stringify(cars, null, 4), year: year, make: make, model: model } )
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})