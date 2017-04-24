const express = require('express')
const nunjucks = require('nunjucks')
const request = require('request-promise')
const credentials = require('./credentials')
const search = require('./scripts/search')
const passport = require('passport')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

// Set Port to either 8080 or PORT environment variable
const port = process.env.PORT || 8080

// Setup static files
app.use(express.static('public'))
app.use('/img', express.static(path.join(__dirname, 'public/img')))
app.use('/js', express.static(path.join(__dirname, 'public/js')))
app.use('/css', express.static(path.join(__dirname, 'public/css')))

// Config passport
require('./scripts/passport')(passport)

// Use Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Templating Engine Nunjucks
nunjucks.configure('templates', {
	autoescape: true,
	express: app
})

// // Setup MongoClient
// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');

// Connection URL
var db_url = 'mongodb://localhost:27017/gecko'
var db

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, database) {
// 	assert.equal(null, err)
// 	db = database
// 	console.log("Connected successfully to server");

// 	app.listen(port, function () {
// 		console.log(`Example app listening on port ${port}!`);
// 	})
// })

// Setup Mongoose
mongoose.connect(db_url)

// Include Routes
require('./routes')(app, passport)

// Start Server
app.listen(port)
console.log('Now running on port: ' + port)