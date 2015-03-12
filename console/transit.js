var Transit = require('../lib/transit')

module.exports = {
  fields: {
    '# Agencies': function () { return this.agencies.length },
    'Agencies': function () { return this.agencies.ids.join('\n') },
    '# Stops': function () { return this.stops.length },
    '# Services': function () { return this.services.length },
    '# Shapes': function () { return this.shapes.length }
  },
  defaultFields: [
    'Agencies',
    '# Stops',
    '# Services',
    '# Shapes'
  ],
  test: function () {
    return this instanceof Transit
  }
}
