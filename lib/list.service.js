module.exports = ServicesList

const List = require('./list')
const util = require('util')

function ServicesList (transit) {
  this._transit = transit

  List.call(this)
}

util.inherits(ServicesList, List)
