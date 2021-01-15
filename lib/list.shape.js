module.exports = ShapesList

const List = require('./list')
const util = require('util')

function ShapesList (transit) {
  this._transit = transit

  List.call(this)

  this._canBeArray = true
}

util.inherits(ShapesList, List)
