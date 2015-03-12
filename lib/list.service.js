module.exports = ServicesList

var List = require('./list')
var util = require('util')

function ServicesList (transit) {
  this._transit = transit

  List.call(this)
}

util.inherits(ServicesList, List)
