var express = require('express')
var nunjucks = require('nunjucks')
var app = express()

// Configure Templating Engine Nunjucks
nunjucks.configure('pages', {
    autoescape: true,
    express: app
})

var info; 
var infoMPG;
//var request = require('request');

//REQUEST-PROMISE MODULE
const request = require('request-promise');
var year = '2012';
var make = 'toyota';
var model = 'corolla';
var requestsSatisfied = 0;
var urlString = 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=' + year + '&make=' + make + '&model=' + model;


const options = {  
  method: 'GET',
  uri: 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/options',
  qs: {
    year: '2012',
    make: 'honda',
    model: 'fit',
  },
  json: true
}

app.get('/', function (req, res) {
  res.render('index.html')
})

app.get('/search', function(req, res) {

	var year = req.query.year;
	var make = req.query.make;
	var model = req.query.model;

	options.qs.year = year;
	options.qs.make = make;
	options.qs.model = model;

	console.log(options);


	request(options)
		.then((cars) => {
			res.render('index.html', { cars: JSON.stringify(cars, null, 4), year: year, make: make, model: model })
	})
	.catch((err) => {
		console.log(err)
		res.send('error in request')
	})

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

	// res.render('index.html', { cars: JSON.stringify(cars, null, 4), year: year, make: make, model: model } )
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

/*
request({url: urlString, json: true}, function (error, res, json) {
    if (!error) {
      info = json;
	  requestsSatisfied++;
    }
	else{
		console.log('threw error');
	}
})

console.log(info);

if(requestsSatisfied > 0){
	var vehicleId = info.menuItem[0].value;

	var urlStringMPG = 'http://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/' + vehicleID;

	request({url: urlStringMPG, json: true}, function (error, res, json) {
    	if (!error) {
    	  infoMPG = json;
    	}
	})

	console.log(infoMPG);
}
*/

