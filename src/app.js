var express = require('express')
var nunjucks = require('nunjucks')
var request = require('request-promise')
var credentials = require('./credentials')
var search = require('./search')
var auth = require('./auth.js')
var passport = require('passport')
var app = express()


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

app.get('/auth/uber',
  passport.authenticate('uber')
)

app.get('/auth/uber/callback', 
  passport.authenticate('uber', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
})

app.get('/search', function(req, res) {
	search.search(req, res, db)
})




