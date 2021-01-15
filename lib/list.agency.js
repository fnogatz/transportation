module.exports = AgenciesList

const List = require('./list')
const util = require('util')

function AgenciesList (transit) {
  this._transit = transit

  List.call(this)
}

util.inherits(AgenciesList, List)
