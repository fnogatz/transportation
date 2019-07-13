var StopTime = require('../lib/stop_time')

module.exports = {
  fields: {
    No: function () { return this.id },
    Arrival: function () { return StopTime.prettyTime(this.arrival) },
    Departure: function () { return StopTime.prettyTime(this.departure) },
    Stop: function () { return this.stop.id },
    Code: function () { return this.stop.code },
    Name: function () { return this.stop.name },
    Lon: function () { return this.stop.lon },
    Lat: function () { return this.stop.lat }
  },
  defaultFields: [
    'No',
    'Code',
    'Arrival',
    'Departure',
    'Lon',
    'Lat'
  ],
  test: function () {
    return this instanceof StopTime
  }
}
