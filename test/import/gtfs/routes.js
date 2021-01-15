const path = require('path')
const test = require('tap').test

const Transit = require('../../../lib/transit')
const Agency = require('../../../lib/agency')
const importRoutes = require('../../../lib/import/gtfs/import.routes')

test('import routes', function (t) {
  const transit = new Transit()
  transit.agencies.add(new Agency({
    id: 'DTA',
    name: 'DTA'
  }))

  t.test('all fields specified', function (t) {
    importRoutes(path.resolve(__dirname, 'data/generic/routes.txt'), transit, function onEnd () {
      testRoutes(transit, t)

      t.end()
    })
  })

  t.test('no agency ID specified', function (t) {
    const transit = new Transit()
    transit.agencies.add(new Agency({
      id: 'DTA',
      name: 'DTA'
    }))

    importRoutes(path.resolve(__dirname, 'data/no-agencyid-in-routes/routes.txt'), transit, function onEnd () {
      testRoutes(transit, t)

      t.end()
    })
  })

  t.end()

  function testRoutes (transit, t) {
    t.equal(transit.agencies.DTA.routes.length, 5)

    t.ok(transit.agencies.DTA.routes.AB)
    t.ok(transit.agencies.DTA.routes.BFC)
    t.ok(transit.agencies.DTA.routes.STBA)
    t.ok(transit.agencies.DTA.routes.CITY)
    t.ok(transit.agencies.DTA.routes.AAMV)

    t.similar(transit.agencies.DTA.routes.AB, {
      shortName: 10,
      longName: 'Airport - Bullfrog'
    })
  }
})
