module.exports = StopsList

const List = require('./list')
const util = require('util')

function StopsList (transit) {
  this._transit = transit

  List.call(this)
}

util.inherits(StopsList, List)
