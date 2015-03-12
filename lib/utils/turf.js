var camelCase = require('camelcase')

var modules = [
  'linestring',
  'point',
  'point-on-line',
  'line-distance',
  'distance',
  'featurecollection'
]

module.exports = {}

modules.forEach(function (moduleName) {
  module.exports[camelCase(moduleName)] = require('turf-' + moduleName)
})
