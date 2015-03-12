module.exports = Stop

var List = require('./list')

function Stop (obj) {
  /*
    Format of this._routes:
    {
      $routeId: {
        $tripId: {
          arrival: $timestamp,
          departure: $timestamp
        },
        ...
      },
      ...
    }
   */
  this._routes = {}

  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== '') {
      this[key] = obj[key]
    }
  }

  if (!obj.name) {
    throw new Error('Stop name must be given.')
  }
}

Object.defineProperty(Stop.prototype, '_transit', {
  get: function () {
    return this._list._transit
  }
})

Object.defineProperty(Stop.prototype, 'routes', {
  get: function () {
    var transit = this._transit

    var routes = new List()
    Object.keys(this._routes).forEach(function (routeId) {
      routes.add(transit.route(routeId), routeId)
    })

    return routes
  }
})

Stop.prototype.addStopTime = function addStopTime (obj) {
  if (!this._routes[obj.route.id]) { this._routes[obj.route.id] = {} }
  if (!this._routes[obj.route.id][obj.trip.id]) { this._routes[obj.route.id][obj.trip.id] = {} }

  this._routes[obj.route.id][obj.trip.id].arrival = obj.arrival
  this._routes[obj.route.id][obj.trip.id].departure = obj.departure
}

Stop.prototype.route = function getRouteForStop (routeId) {
  var stop = this
  var transit = this._transit

  var trips = Object.keys(this._routes[routeId]).map(function (tripId) {
    return {
      trip: transit.route(routeId).trips[tripId],
      arrival: stop._routes[routeId][tripId].arrival,
      departure: stop._routes[routeId][tripId].departure
    }
  })

  return trips
}
