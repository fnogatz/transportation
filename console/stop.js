const Stop = require('../lib/stop')

module.exports = {
  fields: {
    ID: function () { return this.id },
    Code: function () { return this.code },
    Name: function () { return this.name },
    Lat: function () { return this.lat },
    Lon: function () { return this.lon }
  },
  defaultFields: [
    'ID',
    'Code',
    'Lat',
    'Lon'
  ],
  test: function () {
    return this instanceof Stop
  }
}
