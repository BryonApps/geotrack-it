var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
    createDate: {
      type:  Date
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
