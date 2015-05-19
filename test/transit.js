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

  importGTFS.call(transit, './import/gtfs/data/no-agencyid-in-routes', function onEnd () {
    t.equal(transit.agencies.length, 1)
    t.ok(transit.agencies.ucsf)
    t.ok(transit.agencies.ucsf.routes.black)

    t.end()
  })
})
