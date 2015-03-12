module.exports = importTrips

var Trip = require('../../trip')
var csv = require('./csv')

function importTrips (filename, transit, callback) {
  csv(filename, function (trips) {
    trips.forEach(function (tripRow) {
      // Required fields for GTFS
      var obj = {
        id: tripRow.trip_id,
        _serviceId: tripRow.service_id
      }

      // Optional fields
      if (tripRow.trip_headsign) {
        obj.headsign = tripRow.trip_headsign
      }
      if (tripRow.trip_short_name) {
        obj.shortName = tripRow.trip_short_name
      }

      var trip = new Trip(obj)

      if (tripRow.shape_id) {
        trip._shapeId = tripRow.shape_id
      }

      transit.route(tripRow.route_id).trips.add(trip, trip.id)
    })

    callback()
  })
}
