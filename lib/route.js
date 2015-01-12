module.exports = Route;

var TripsList = require('./list.trip');


function Route(obj) {
  if (!obj.shortName && !obj.longName) {
    throw new Error('Route name must be given');
  }

  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== '')
      this[key] = obj[key];
  }

  this.trips = new TripsList(this);
}


Route.typeToString = function typeToString(type) {
  if (type == 0)
    return 'Tram, Streetcar, Light rail';
  if (type == 1)
    return 'Subway, Metro';
  if (type == 2)
    return 'Rail';
  if (type == 3)
    return 'Bus';
  if (type == 4)
    return 'Ferry';
  if (type == 5)
    return 'Cable car';
  if (type == 6)
    return 'Gondola, Suspended cable car';
  if (type == 7)
    return 'Funicular';
  return '';
}
