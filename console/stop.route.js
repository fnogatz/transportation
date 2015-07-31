var StopTime = require('../lib/stop_time')

module.exports = {
  fields: {
    'Trip': function () { return this.trip.id },
    'Headsign': function () { return this.trip.headsign },
    'Arrival': function () { return StopTime.prettyTime(this.arrival) },
    'Departure': function () { return StopTime.prettyTime(this.departure) }
  },
  test: function () {
    var b = true
    b = b && this instanceof Array
    b = b && this.every(function (row) {
        return (row.hasOwnProperty('arrival') &&
        row.hasOwnProperty('departure') &&
        row.hasOwnProperty('trip'))
      })

    return b
  }
}
