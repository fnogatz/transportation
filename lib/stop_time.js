module.exports = StopTime;


var Stop = require('./stop');


function StopTime(obj) {
  this._stopId = null;

  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== '')
      this[key] = obj[key];
  }
}


Object.defineProperty(StopTime.prototype, 'stop', {
  get: function() {
    if (!this._stopId) {
      return null;
    }

    var transit = this._list._trip._list._route._list._agency._list._transit;
    return transit.stops[this._stopId];
  }
});


/**
 * Populate properties of Stop into StopTime
 */
['lat', 'lon', 'code', 'name'].forEach(function(stopProperty) {
  Object.defineProperty(StopTime.prototype, stopProperty, {
    get: function() {
      if (!this._stopId) {
        return undefined;
      }

      var transit = this._list._trip._list._route._list._agency._list._transit;
      return transit.stops[this._stopId][stopProperty];
    }
  });
});


/**
 * Insert colons in a time given as HHMMSS to return HH:MM:SS.
 * @param  {String} hhmmss
 * @return {String}
 */
StopTime.prettyTime = function prettyTime(hhmmss) {
  return hhmmss.replace(/^([0-9]{2})([0-9]{2})([0-9]{2})$/, '$1:$2:$3');
}
