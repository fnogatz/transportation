module.exports = importStops;

var Stop = require('../../stop');
var csv = require('./csv');


function importStops(filename, transit, callback) {
  csv(filename, function(stops) {
    stops.forEach(function(stopRow) {
      var stop = new Stop({
        // Required fields in GTFS
        id: stopRow.stop_id,
        name: stopRow.stop_name,
        lat: parseFloat(stopRow.stop_lat),
        lon: parseFloat(stopRow.stop_lon)
      });

      // Optional fields
      stop.code = stopRow.stop_code;

      transit.stops.add(stop);
    });

    callback();
  });
}
