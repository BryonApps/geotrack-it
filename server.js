// FuelTrac Server
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require ('mongoose');

// Just add bluebird to your package.json, and then the following line should work
mongoose.Promise = require('bluebird');

var databaseUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var promise = mongoose.connect(databaseUri, {
  useMongoClient: true,
  /* other options */
});

promise.then(function(db) {
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});

var throng = require('throng');
var WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({
  workers: WORKERS,       // Number of workers (cpu count)
  lifetime: Infinity  // ms to keep cluster alive (Infinity)
}, start);

function start() {
	var app = express();
	var router = express.Router();

	var pointsRoute = require('./js/routes/points');

	var port = process.env.PORT || 1337;

	app.use('/', router);
	app.use(bodyParser.urlencoded({
	  		extended: true }));

	app.use('/points', pointsRoute);
	app.get('/cpu', cpuBound);
	app.get('/memory', memoryBound);
	app.get('/io', ioBound);
	app.listen(port, onListen);


  function cpuBound(req, res, next) {
    var key = Math.random() < 0.5 ? 'ninjaturtles' : 'powerrangers';
    var hmac = crypto.createHmac('sha512WithRSAEncryption', key);
    var date = Date.now() + '';
    hmac.setEncoding('base64');
    hmac.end(date, function() {
      res.send('A hashed date for you! ' + hmac.read());
    });
  }

  function memoryBound(req, res, next) {
    var hundredk = new Array(100 * 1024).join('X');
    setTimeout(function sendResponse() {
      res.send('Large response: ' + hundredk);
    }, 20).unref();
  }

  function ioBound(req, res, next) {
    setTimeout(function SimulateDb() {
      res.send('Got response from fake db!');
    }, 300).unref();
  }

  function onListen() {
    console.log('Listening on', port);
  }
}
