module.exports = StopTimesList

const List = require('./list')
const util = require('util')

function StopTimesList (trip) {
  this._trip = trip

  List.call(this)
}

util.inherits(StopTimesList, List)

Object.defineProperty(StopTimesList.prototype, '_transit', {
  get: function () {
    return this._trip._transit
  }
})

StopTimesList.prototype.add = function addStopTime (stopTime, id) {
  StopTimesList.super_.prototype.add.call(this, stopTime, id)

  const trip = this._trip
  const stopId = stopTime._stopId
  this._transit.stops[stopId].addStopTime({
    route: trip.route,
    trip: trip,
    arrival: stopTime.arrival,
    departue: stopTime.departure
  })
}
