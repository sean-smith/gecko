var express = require('express')
var nunjucks = require('nunjucks')
var request = require('request-promise')
var credentials = require('./credentials')
var search = require('./search')
var app = express()

var mpg_url = "http://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/";

PORT = 8080

// Configure Templating Engine Nunjucks
nunjucks.configure('pages', {
    autoescape: true,
    express: app
})

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/gecko'
var db

// Use connect method to connect to the server
MongoClient.connect(url, function(err, database) {
  assert.equal(null, err)
  db = database
  console.log("Connected successfully to server");
 
  app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
  })

})


app.get('/', function (req, res) {
	res.render('index.html')
})

app.get('/login', function (req, res) {
	res.render('login.html', login_url=credentials.client_id)
})

app.get('/search', function(req, res) {
	search.search(req, res, db)
})




