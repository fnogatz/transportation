module.exports = TripsList

const List = require('./list')
const util = require('util')

function TripsList (route) {
  this._route = route

  List.call(this)
}

util.inherits(TripsList, List)

TripsList.prototype.add = function addTrip (trip, id) {
  TripsList.super_.prototype.add.call(this, trip, id)

  const routeId = this._route.id
  this._route._list._agency._trips[trip.id] = routeId

  const agencyId = this._route._list._agency.id
  this._route._list._agency._list._transit._trips[id] = {
    agency: agencyId,
    route: routeId
  }
}
