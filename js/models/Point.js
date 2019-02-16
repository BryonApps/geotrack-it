var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
    createDate: {
      type:  Date
    },
    publishDate: {
      type:  Date
    },
    eventName: {
      type: String
    }
    data: {
      type: String
    },
    coreid: {
      type: String
    },
    coordinateLat: {
      type:  Number
    },
    coordinateLong: {
      type:  Number
    },
    deviceId : {
      type:  String,
      trim: true
    }
  }
);

var Point = mongoose.model('Point', PointSchema);
//Export model
module.exports = Point
