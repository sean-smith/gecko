var express = require('express')
var nunjucks = require('nunjucks')
var app = express()

// Configure Templating Engine Nunjucks
nunjucks.configure('pages', {
    autoescape: true,
    express: app
})

var info;
var request = require('request');
request({url: 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/year', json: true}, function (error, res, json) {
    if (!error) {
      info = json;
    }
})

app.get('/', function (req, res) {
  res.send(info.menuItem);
})

app.get('/home', function(req, res) {
	res.render('index.njk');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})



