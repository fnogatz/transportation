var test = require('tap').test

var Transit = require('../lib/transit')

test('creation', function (t) {
  Transit()

  t.end()
})

test('Transit.prototype.importGTFS', function (t) {
  var transit = new Transit()

  var importGTFS = transit.importGTFS
  t.type(importGTFS, 'function')

  t.end()
})
