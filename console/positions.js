module.exports = {
  fields: {
    '#': function (i) { return i + 1 },
    'Lon': function () { return this.lon },
    'Lat': function () { return this.lat },
    'Time': function () { return this.time },
    'Distance': function () { return this.distance },
    'Travel Distance': function () { return this.travelDistance }
  },
  defaultFields: [
    'Lon',
    'Lat',
    'Time',
    'Distance',
    'Travel Distance'
  ],
  test: function () {
    return (typeof this === 'object' &&
      this instanceof Array &&
      allWithProperty(this, 'lon') &&
      allWithProperty(this, 'lat') &&
      allWithProperty(this, 'time'))
  }
}

function allWithProperty (arr, prop) {
  return Array.prototype.every.call(arr, function (el) {
    return el.hasOwnProperty(prop)
  })
}
