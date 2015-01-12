module.exports = {
  fields: {
    '#': function(i) { return i+1; },
    'Lon': function() { return this.lon; },
    'Lat': function() { return this.lat; },
    'Distance': function() { return this.distance; },
  },
  defaultFields: [
    'Lon',
    'Lat',
  ],
  test: function() {
    return (typeof this === 'object' &&
        this instanceof Array &&
        this[0].hasOwnProperty('lon') &&
        this[0].hasOwnProperty('lat'));
  },
};
