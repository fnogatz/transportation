module.exports = StopsList

var List = require('./list')
var util = require('util')

function StopsList (transit) {
  this._transit = transit

  List.call(this)
}

util.inherits(StopsList, List)
