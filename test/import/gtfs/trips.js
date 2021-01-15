const path = require('path')
const test = require('tap').test

const Transit = require('../../../lib/transit')
const Agency = require('../../../lib/agency')
const Route = require('../../../lib/route')
const importTrips = require('../../../lib/import/gtfs/import.trips')

test('import stops', function (t) {
  const transit = new Transit()

  transit.agencies.add(new Agency({
    id: 'DTA',
    name: 'DTA'
  }))

  transit.agencies.DTA.routes.add(new Route({
    longName: 'Some Route'
  }), 'AAMV')

  const route = transit.agencies.DTA.routes.AAMV

  importTrips(path.resolve(__dirname, 'data/generic/trips.txt.small'), transit, function onEnd () {
    t.equal(route.trips.length, 1)

    t.similar(route.trips.AAMV4, {
      headsign: 'to Airport'
    })

    t.end()
  })
})
