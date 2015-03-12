module.exports = AgenciesList

var List = require('./list')
var util = require('util')

function AgenciesList (transit) {
  this._transit = transit

  List.call(this)
}

util.inherits(AgenciesList, List)
