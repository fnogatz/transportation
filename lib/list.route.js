module.exports = RoutesList

var List = require('./list')
var util = require('util')

function RoutesList (agency) {
  this._agency = agency

  List.call(this)
}

util.inherits(RoutesList, List)

RoutesList.prototype.add = function addRoute (route, id) {
  RoutesList.super_.prototype.add.call(this, route, id)

  var agencyId = this._agency.id
  this._agency._list._transit._routes[route.id] = agencyId
}
