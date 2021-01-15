module.exports = importStops

const Stop = require('../../stop')
const csv = require('./csv')

function importStops (filename, transit, callback) {
  csv(filename, function (err, stops) {
    if (err) {
      return callback(err)
    }

    stops.forEach(function (stopRow) {
      const stop = new Stop({
        // Required fields in GTFS
        id: stopRow.stop_id,
        name: stopRow.stop_name,
        lat: parseFloat(stopRow.stop_lat),
        lon: parseFloat(stopRow.stop_lon)
      })

      // Optional fields
      stop.code = stopRow.stop_code

      transit.stops.add(stop)
    })

    callback()
  })
}
