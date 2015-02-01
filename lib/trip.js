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


Object.defineProperty(Trip.prototype, '_transit', {
  get: function() {
    if (!this._list || !this._list._route || !this._list._route._list || !this._list._route._list._agency || !this._list._route._list._agency._list)
      return null;

    return this._list._route._list._agency._list._transit;
  }
});


Object.defineProperty(Trip.prototype, 'route', {
  get: function() {
    return this._list._route;
  }
});


Object.defineProperty(Trip.prototype, 'shape', {
  get: function() {
    if (!this._shapeId) {
      return null;
    }

    return this._transit.shapes[this._shapeId];
  }
});


Object.defineProperty(Trip.prototype, 'service', {
  get: function() {
    if (!this._serviceId || !this._transit) {
      return null;
    }

    return this._transit.services[this._serviceId];
  }
});
