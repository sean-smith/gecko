var express = require('express')
var nunjucks = require('nunjucks')
var app = express()

// Configure Templating Engine Nunjucks
nunjucks.configure('pages', {
    autoescape: true,
    express: app
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/home', function(req, res) {
	res.render('index.njk')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})