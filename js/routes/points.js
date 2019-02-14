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
	var today = new Date();
	//today.setDate(today.getDate() - 1);
	//today.setHours(5,0,0,0);

	console.log("Today        : " + today);
  	res.json({"today" : today});
});

// register a load...
router.post('/addPoint', jsonParser, function(req, res) {
	console.log("In addPoint, req: ", req );

	var pointData = {
		_id : new mongoose.Types.ObjectId()
	};
	res.status(200).json({ status: 'ok, sorta working!' });
	/*
	if (!req.body.client_load_id || req.body.client_load_id.length < 36) {
			res.status(400).json({ error: 'Missing required field: client_load_id' });
	} else {
		loadData.clientLoadId = req.body.client_load_id;
	}

	if (!req.body.tripId || req.body.tripId.length == 0) {
		res.status(400).json({ error: 'Missing required field: tripId'} );
	} else {
		loadData._tripId = mongoose.Types.ObjectId(req.body.tripId);
	}

	if (!req.body.driverId || req.body.driverId.length == 0) {
		res.status(400).json({ error: 'Missing required field: driverId'} );
	} else {
		loadData._driverId = mongoose.Types.ObjectId(req.body.driverId);
	}

	if (!req.body.companyId || req.body.companyId.length == 0) {
		res.status(400).json({ error: 'Missing required field: companyId'});
	} else {
		loadData._driverCompanyId = mongoose.Types.ObjectId(req.body.companyId);
	}

	if (!req.body.deliveryState || req.body.deliveryState.length == 0) {
		res.status(400).json({ error: 'Missing required field: deliveryState'});
	} else {
		loadData.deliveryState = req.body.deliveryState;
	}

	if (req.body.deliveryCity && req.body.deliveryCity.length == 0) {
		loadData.deliveryCity = req.body.deeliveryCity;
	}

	if (req.body.deliveryCounty && req.body.deliveryCounty.length == 0) {
		loadData.deliveryCounty = req.body.deliveryCounty;
	}

	if (req.body.deliveryPostalCode && req.body.deliveryPostalCode.length == 0) {
		loadData.deliveryPostalCode = req.body.deliveryPostalCode;
	}

	if (req.body.deliveryCoordinateLat) {
		loadData.deliveryCoordinateLat = req.body.deliveryCoordinateLat;
	}

	if (req.body.deliveryCoordinateLong) {
		loadData.deliveryCoordinateLong = req.body.deliveryCoordinateLong;
	}

	if (!req.body.deliveryDate ) {
		loadData.deliveryDate = new Date();
	}

	if (!req.body.deliveryDate || req.body.deliveryDate.length == 0) {
		loadData.deliveryDate = new Date();
	} else {
		loadData.deliveryDate = new Date(req.body.deliveryDate);
	}

	loadData.product1Code = req.body.product1Code;
	loadData.product2Code = req.body.product2Code;
	loadData.product3Code = req.body.product3Code;
	loadData.product4Code = req.body.product4Code;

	loadData.product1NetGallons = req.body.product1NetGallons;
	loadData.product1GrossGallons = req.body.product1GrossGallons;

	loadData.product2NetGallons = req.body.product2NetGallons;
	loadData.product2GrossGallons = req.body.product2GrossGallons;

	loadData.product3NetGallons = req.body.product3NetGallons;
	loadData.product3GrossGallons = req.body.product3GrossGallons;

	loadData.product4NetGallons = req.body.product4NetGallons;
	loadData.product4GrossGallons = req.body.product4GrossGallons;

	DeliveredLoad.create(loadData, function (error, newLoad) {
		if (error && error.code != 11000) {
			res.json(error);
		} else {
			Trip.findOne({'_id': mongoose.Types.ObjectId(req.body.tripId)})
				.exec(function (err, trip) {
				if (trip) {
					trip.deliveredLoads.addToSet(newLoad.id);
					trip.save(function (err) {
    				if (err) {
							res.status(400).json({ error: 'Error linking load to trip.' + req.body.tripId });
						} else {
							res.json(newLoad);
						}
  				});
				} else {
					res.status(400).json({ error: 'Trip Not Found.' + req.body.tripId });
				}
			});
		}
	});
	*/
});

module.exports = router;
