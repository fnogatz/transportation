module.exports = Trip;


var turf = require('./utils/turf');
var time = require('./utils/time');
var StopTimesList = require('./list.stop_time');


function Trip(obj) {
  this._shapeId = null;
  this._serviceId = null;
  this._positions = null;

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


Object.defineProperty(Trip.prototype, 'positions', {
  get: function() {
    if (this._positions) {
      return this._positions;
    }

    this._positions = this.getPositions();
    return this._positions;
  }
});


Trip.prototype.getPositions = function getPositions() {
  var stops = this.stops.toArray();
  var shape = this.shape;

  var points = shape.map(function(row) {
    return {
      lat: row.lat,
      lon: row.lon,
      time: null
    };
  });

  var firstStop = stops[0];
  points.unshift({
    lat: firstStop.lat,
    lon: firstStop.lon,
    time: firstStop.departure || firstStop.arrival,
    stopId: firstStop._stopId,
  });

  var lastStop = stops.slice(-1)[0];
  points.push({
    lat: lastStop.lat,
    lon: lastStop.lon,
    time: lastStop.arrival || lastStop.departure,
    stopId: lastStop._stopId,
  });

  var pointsLine, pointOnLine, point, currStop, ix;
  var lastAddedIndex = 0;

  // omit first and last stop
  for (var i = 1; i < stops.length-1; i++) {
    currStop = stops[i];

    pointsLine = turf.linestring(points.map(function(row) {
      return [ row.lon, row.lat ];
    }));

    point = turf.point([ currStop.lon, currStop.lat ]);
    pointOnLine = turf.pointOnLine(pointsLine, point);

    /**
     * pointOnLine.properties.index =: ix is the index of the
     * nearest line segment,
     * i.e. add pointOnLine in between points[ix] and points[ix+1]
     */
    ix = pointOnLine.properties.index;

    points.splice(ix+1, 0, {
      lat: point.geometry.coordinates[1],
      lon: point.geometry.coordinates[0],
      time: currStop.arrival,
      stopId: currStop._stopId,
    });
    lastAddedIndex = ix+1;

    if (currStop.arrival !== currStop.departure) {
      points.splice(lastAddedIndex+1, 0, {
        lat: point.geometry.coordinates[1],
        lon: point.geometry.coordinates[0],
        time: currStop.departure,
        stopId: currStop._stopId,
      });
      lastAddedIndex += 1;
    }
  }

  setTimesOnPositions(points);
  setDistance(points);

  return points;
}


function setDistance(points) {
  var distanceAll = 0;
  var distance;
  var currPoint;
  var prevPoint = turf.point(toLonLat(points[0]));
  points[0].distance = points.travelDistance = 0;

  for (var i = 1; i < points.length; i++) {
    currPoint = turf.point(toLonLat(points[i]));
    distance = turf.distance(prevPoint, currPoint, 'kilometers');

    points[i].distance = Math.round(distance * 1000); // use meters
    distanceAll += distance;
    points[i].travelDistance = distanceAll;

    prevPoint = currPoint;
  }
}


function setTimesOnPositions(points) {
  var prevWithTime = 0;

  for (var i = 1; i < points.length; i++) {
    if (points[i].time) {
      setTimes(points, prevWithTime, i);
      prevWithTime = i;
    }
  }
}


function setTimes(points, from, to) {
  var startTime = points[from].time;
  var endTime = points[to].time;
  var distanceAll = turf.lineDistance(turf.linestring(points.slice(from, to+1).map(toLonLat)), 'kilometers');
  
  var distance;
  for (var i = from+1; i < to; i++) {
    distance = turf.lineDistance(turf.linestring(points.slice(from, i+1).map(toLonLat)), 'kilometers');
    points[i].time = time.guess(startTime, endTime, distance / distanceAll);
  }
}


function toLonLat(row) {
  return [ row.lon, row.lat ];
}
