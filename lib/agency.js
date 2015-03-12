module.exports = Agency

var RoutesList = require('./list.route.js')

function Agency (name) {
  var obj
  if (typeof name === 'string') {
    obj = {
      name: name,
      id: name
    }
  } else {
    obj = name
  }

  if (!obj.name) {
    throw new Error('Agency name must be given')
  }

  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== '') {
      this[key] = obj[key]
    }
  }

  this.routes = new RoutesList(this)

  /**
   * Store the relation trip_id > route_id.
   * @type {Object}
   */
  this._trips = {}
}
