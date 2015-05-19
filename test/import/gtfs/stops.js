var test = require('tap').test

var Transit = require('../../../lib/transit')
var importStops = require('../../../lib/import/gtfs/import.stops')

test('import stops', function (t) {
  var transit = new Transit()

  importStops('./data/generic/stops.txt', transit, function onEnd () {
    t.equal(transit.stops.length, 2)

    // check IDs
    t.ok(transit.stops[900170101])
    t.ok(transit.stops[900116202])

    t.similar(transit.stops[900170101], {
      name: 'Adenauerbrücke',
      id: 900170101,
      lon: 9.988553888888889,
      lat: 48.3887511111111
    })

    t.similar(transit.stops[900116202], {
      name: 'Albstraße',
      id: 900116202,
      lon: 9.98619888888889,
      lat: 48.4352952777778
    })

    t.end()
  })
})
