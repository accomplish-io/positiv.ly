var express = require('express');
var bodyParser= require('body-parser');
var path= require('path');
var db = require('./db/db-setup.js');
var app = express();
var port = process.env.PORT || 3021;

if(!process.env.PORT) {
  var morgan = require('morgan');
  app.use(morgan('dev'));
}

var authCheck = jwt({
  secret: new Buffer('2J7MDMkOhZ28NCErCzVJBMDfBgJU2EugMgyFg2bgMpctYfK36jgZCa_9ARFd2BPH', 'base64'),
  audience: 'ZqYpGZq0b47l5w3GkYDYCh9aBZY2BocC'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

require('./routes.js')(app, express, db);

app.listen(port, function() {
  console.log('Listening on ' + port);
});

module.exports = {
  app: app,
};