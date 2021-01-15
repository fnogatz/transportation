const path = require('path')
const test = require('tap').test

const Transit = require('../../../lib/transit')
const importStops = require('../../../lib/import/gtfs/import.stops')

test('import stops', function (t) {
  const transit = new Transit()

  importStops(path.resolve(__dirname, 'data/generic/stops.txt'), transit, function onEnd () {
    t.equal(transit.stops.length, 9)

    t.ok(transit.stops.FUR_CREEK_RES)

    t.similar(transit.stops.FUR_CREEK_RES, {
      name: 'Furnace Creek Resort (Demo)',
      id: 'FUR_CREEK_RES',
      lon: -117.133162,
      lat: 36.425288
    })

    t.end()
  })
})
