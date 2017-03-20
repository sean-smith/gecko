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
var request = require('request');

var year = '2012';
var make = 'toyota';
var model = 'corolla';
var requestsSatisfied = 0;
var urlString = 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=' + year + '&make=' + make + '&model=' + model;

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

app.get('/', function (req, res) {
  res.send(info.menuItem[0]); //Only using first item for now. Might be too much info for auto/manual.
  if(requestsSatisfied >0){
	  res.send(infoMPG);
  }
})


app.get('/home', function(req, res) {
	res.render('index.njk');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})



