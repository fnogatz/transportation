var test = require('tap').test

var Transit = require('../../../lib/transit')
var Agency = require('../../../lib/agency')
var importRoutes = require('../../../lib/import/gtfs/import.routes')

test('import routes', function (t) {
  var transit = new Transit()
  transit.agencies.add(new Agency({
    id: 'SWU',
    name: 'SWU'
  }))

  importRoutes('./data/generic/routes.txt', transit, function onEnd () {
    t.equal(transit.agencies.SWU.routes.length, 2)

    t.ok(transit.agencies.SWU.routes[87001])
    t.ok(transit.agencies.SWU.routes[87003])

    t.similar(transit.agencies.SWU.routes[87001], {
      shortName: 1,
      longName: 'Söflingen–Böfingen',
      color: 'ED1B24',
      textColor: 'FFFFFF'
    })
    t.similar(transit.agencies.SWU.routes[87003], {
      shortName: 3,
      longName: 'Wiblingen (Alte Siedlung)–Wissenschaftsstadt ',
      color: '005DA3',
      textColor: 'FFFFFF'
    })

    t.end()
  })
})
