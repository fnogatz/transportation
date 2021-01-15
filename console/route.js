const Route = require('../lib/route')

module.exports = {
  fields: {
    ID: function () { return this.id },
    'Type ID': function () { return this.type },
    Type: function () { return Route.typeToString(this.type) },
    'Short Name': function () { return this.shortName },
    'Long Name': function () { return this.longName },
    '# Trips': function () { return this.trips.length },
    Color: function () { return '#' + this.color },
    'Text Color': function () { return '#' + this.textColor }
  },
  defaultFields: [
    'ID',
    'Short Name',
    'Long Name',
    'Type',
    'Color',
    'Text Color',
    '# Trips'
  ],
  test: function () {
    return this instanceof Route
  }
}
