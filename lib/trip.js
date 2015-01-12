module.exports = Trip;


var StopTimesList = require('./list.stop_time');


function Trip(obj) {
  this._shapeId = null;
  this._serviceId = null;

  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== '')
      this[key] = obj[key];
  }

  this.stops = new StopTimesList(this);
}


Object.defineProperty(Trip.prototype, 'shape', {
  get: function() {
    if (!this._shapeId) {
      return null;
    }

    var transit = this._list._route._list._agency._list._transit;
    return transit.shapes[this._shapeId];
  }
});


Object.defineProperty(Trip.prototype, 'service', {
  get: function() {
    if (!this._serviceId) {
      return null;
    }

    var transit = this._list._route._list._agency._list._transit;
    return transit.services[this._serviceId];
  }
});
