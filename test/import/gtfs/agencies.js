var test = require('tap').test

var Transit = require('../../../lib/transit')
var importAgencies = require('../../../lib/import/gtfs/import.agency')

test('import agency', function (t) {
  var transit = new Transit()

  importAgencies(__dirname + '/data/generic/agency.txt', transit, function onEnd () {
    t.equal(transit.agencies.length, 1)
    t.ok(transit.agencies.DTA)
    t.similar(transit.agencies.DTA, {
      id: 'DTA',
      name: 'Demo Transit Authority',
      url: 'http://google.com',
      timezone: 'America/Los_Angeles'
    })

    t.end()
  })
})
