module.exports = {
  fields: {
    '#': function (i) { return i + 1 },
    'Lon': function () { return this.lon },
    'Lat': function () { return this.lat },
    'Distance': function () { return this.distance }
  },
  defaultFields: [
    'Lon',
    'Lat'
  ],
  test: function () {
    return (typeof this === 'object' &&
      this instanceof Array &&
      allWithProperty(this, 'lon') &&
      allWithProperty(this, 'lat') &&
      !allWithProperty(this, 'time'))
  }
}

function allWithProperty (arr, prop) {
  return Array.prototype.every.call(arr, function (el) {
    return el.hasOwnProperty(prop)
  })
}
