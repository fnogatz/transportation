module.exports = StopTimesList;

var List = require('./list');
var util = require('util');


function StopTimesList(trip) {
  this._trip = trip;

  List.call(this);
}

util.inherits(StopTimesList, List);


StopTimesList.prototype.add = function addStopTime(stop_time, id) {
  StopTimesList.super_.prototype.add.call(this, stop_time, id);
}
