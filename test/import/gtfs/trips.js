var test = require('tap').test

var Transit = require('../../../lib/transit')
var Agency = require('../../../lib/agency')
var Route = require('../../../lib/route')
var importTrips = require('../../../lib/import/gtfs/import.trips')

test('import stops', function (t) {
  var transit = new Transit()

  transit.agencies.add(new Agency({
    id: 'SWU',
    name: 'SWU'
  }))

  transit.agencies.SWU.routes.add(new Route({
    longName: 'Some Route'
  }), 87907)

  var route = transit.agencies.SWU.routes[87907]

  importTrips(__dirname + '/data/generic/trips.txt', transit, function onEnd () {
    t.equal(route.trips.length, 2)

    t.similar(route.trips['87907HYs-2830'], {
      headsign: 'Wiblingen (Alte Siedlung)'
    })
    t.similar(route.trips['87907RYs-2604'], {
      headsign: 'Wissenschaftsstadt'
    })

    t.end()
  })
})
