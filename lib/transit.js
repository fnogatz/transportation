module.exports = Transit

const AgenciesList = require('./list.agency')
const StopsList = require('./list.stop')
const ServicesList = require('./list.service')
const ShapesList = require('./list.shape')

const importGTFS = require('./import/gtfs/index')

function Transit () {
  this.agencies = new AgenciesList(this)
  this.stops = new StopsList(this)
  this.services = new ServicesList(this)
  this.shapes = new ShapesList(this)

  /**
   * Store the relation route_id > agency_id.
   * @type {Object}
   */
  this._routes = {}

  /**
   * Store the relation trip_id > [agency_id, route_id].
   * @type {Object}
   */
  this._trips = {}
}

Object.defineProperty(Transit.prototype, 'trips', {
  get: function getAllTrips () {
    const self = this
    const trips = this._trips
    const res = []
    for (const tripId in trips) {
      res.push(self.trip(tripId))
    }
    return res
  }
})

Transit.prototype.importGTFS = importGTFS

Transit.prototype.route = function getRoute (id) {
  const agencyId = this._routes[id]
  if (!agencyId) {
    return false
  }

  return this.agencies[agencyId].routes[id]
}

Transit.prototype.trip = function getTrip (id) {
  const ids = this._trips[id]
  if (!ids) {
    return false
  }

  return this.agencies[ids.agency].routes[ids.route].trips[id]
}
