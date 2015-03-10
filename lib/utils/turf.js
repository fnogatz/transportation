var camelCase = require('camelcase');

var modules = [
  'linestring',
  'point',
  'point-on-line',
  'line-distance',
  'distance',
];

module.exports = {};

modules.forEach(function(moduleName) {
  module.exports[camelCase(moduleName)] = require('turf-'+moduleName);
});
