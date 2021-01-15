const Trip = require('../lib/trip')

module.exports = {
  fields: {
    ID: function () { return this.id },
    Headsign: function () { return this.headsign },
    '# Shape Points': function () { return this.shape.length },
    '# Stops': function () { return this.stops.length },
    Service: function () { return this.service.id }
  },
  test: function () {
    return this instanceof Trip
  }
}
