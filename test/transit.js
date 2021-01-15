const test = require('tap').test

const Transit = require('../lib/transit')

test('creation', function (t) {
  Transit()

  t.end()
})

test('Transit.prototype.importGTFS', function (t) {
  const transit = new Transit()

  const importGTFS = transit.importGTFS
  t.type(importGTFS, 'function')

  t.end()
})
