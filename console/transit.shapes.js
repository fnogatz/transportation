var ShapesList = require('../lib/list.shape')
var tconsole = require('tconsole')

module.exports = {
  fields: {
    ID: function () { return this.id },
    Points: function () { return this.length }
  },
  test: function () {
    return this instanceof ShapesList
  },
  insert: tconsole.insert.Array,
  headers: true
}
