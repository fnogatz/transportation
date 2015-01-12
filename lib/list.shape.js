module.exports = ShapesList;

var List = require('./list');
var util = require('util');


function ShapesList(transit) {
  this._transit = transit;

  List.call(this);

  this._canBeArray = true;
}

util.inherits(ShapesList, List);
