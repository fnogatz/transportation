module.exports = importTrips

const Trip = require('../../trip')
const csv = require('./csv')

function importTrips (filename, transit, callback) {
  csv(filename, function (err, trips) {
    if (err) {
      return callback(err)
    }

    trips.forEach(function (tripRow) {
      // Required fields for GTFS
      const obj = {
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

      const trip = new Trip(obj)

      if (tripRow.shape_id) {
        trip._shapeId = tripRow.shape_id
      }

      transit.route(tripRow.route_id).trips.add(trip, trip.id)
    })

    callback()
  })
}
