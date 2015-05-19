var test = require('tap').test

var Transit = require('../../../lib/transit')
var importAgencies = require('../../../lib/import/gtfs/import.agency')

test('import agency', function (t) {
  var transit = new Transit()

  importAgencies(__dirname + '/data/generic/agency.txt', transit, function onEnd () {
    t.equal(transit.agencies.length, 1)
    t.ok(transit.agencies.SWU)
    t.similar(transit.agencies.SWU, {
      id: 'SWU',
      name: 'Stadtwerke Ulm',
      language: 'de',
      url: 'http://www.swu.de'
    })

    t.end()
  })
})
