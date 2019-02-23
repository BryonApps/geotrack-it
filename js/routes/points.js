// Handler for loads calls...

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const uuid = require('uuid/v4');

var Constants = require('../common/Constants');
var Point = require('../models/Point');

var app = express();

var mongoose = require('mongoose');
// create application/json parser
var jsonParser = bodyParser.json();

var uuidv4 = uuid();
uuidv4 = uuidv4.toUpperCase();

router.get('/', function(req, res) {
  Point.find({}, null, {sort: {publishDate: -1}}, function(err, points) {
    var response = {
			points: null
		}
		var pointResults = []

    points.forEach(function(point) {
			var pointResult = {}
			pointResult.publishDate = new Date(point.publishDate)
			pointResult.coordinateLat = point.coordinateLat
			pointResult.coordinateLong = point.coordinateLong
			pointResult.eventName = point.eventName
			
      pointResults.push(pointResult);
    });

		response.points = pointResults

    res.send(pointResults);
  });
});

// register a point to the database...
router.post('/addPoint', jsonParser, function(req, res) {
	console.log("In addPoint" );

	var pointData = {
		_id : new mongoose.Types.ObjectId()
	};

	/*if (!req.body.deviceId || req.body.deviceId.length == 0) {
		res.status(400).json({ error: 'Missing required field: deviceId'} );
	} else {
		pointData.deviceId = req.body.deviceId;
	}
	*/
	console.log('Here is the data: ', req.body.data)
	pointData.dataString = req.body.data

	var latLong = pointData.dataString.split(',')
	if (latLong != null && latLong.length == 2) {
		pointData.coordinateLat = latLong[0]
		pointData.coordinateLong = latLong[1]
	}

	pointData.eventName = req.body.event
	pointData.coreid = req.body.coreid
	pointData.publishDate = req.body.published_at
	pointData.createDate = new Date();

	//res.status(200).json({ status: 'ok, sorta working!' });

	Point.create(pointData, function (error, newPoint) {
		if (error && error.code != 11000) {
			res.json(error);
		} else {
			res.status(200).json({ status: 'ok, sorta working!' });
		}
	});

});

module.exports = router;
