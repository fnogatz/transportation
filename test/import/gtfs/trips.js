var path = require('path')
var test = require('tap').test

var Transit = require('../../../lib/transit')
var Agency = require('../../../lib/agency')
var Route = require('../../../lib/route')
var importTrips = require('../../../lib/import/gtfs/import.trips')

test('import stops', function (t) {
  var transit = new Transit()

  transit.agencies.add(new Agency({
    id: 'DTA',
    name: 'DTA'
  }))

  transit.agencies.DTA.routes.add(new Route({
    longName: 'Some Route'
  }), 'AAMV')

  var route = transit.agencies.DTA.routes.AAMV

  importTrips(path.resolve(__dirname, 'data/generic/trips.txt.small'), transit, function onEnd () {
    t.equal(route.trips.length, 1)

    t.similar(route.trips.AAMV4, {
      headsign: 'to Airport'
    })

    t.end()
  })
})
