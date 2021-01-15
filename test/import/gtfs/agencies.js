const path = require('path')
const test = require('tap').test

const Transit = require('../../../lib/transit')
const importAgencies = require('../../../lib/import/gtfs/import.agency')

test('import agency', function (t) {
  const transit = new Transit()

  importAgencies(path.resolve(__dirname, 'data/generic/agency.txt'), transit, function onEnd () {
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
