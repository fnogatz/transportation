const path = require('path')
const test = require('tap').test

const Transit = require('../../../lib/transit')
const Agency = require('../../../lib/agency')
const Route = require('../../../lib/route')
const Trip = require('../../../lib/trip')
const Stop = require('../../../lib/stop')
const importStopTimes = require('../../../lib/import/gtfs/import.stop_times')

test('import stop_times', function (t) {
  const transit = initTransit()

  t.test('pickup time', function (t) {
    importStopTimes(path.resolve(__dirname, 'data/pickup-dropoff-types/stop_times.txt'), transit, function onEnd () {
      const stopTimes = transit.agencies.DTA.routes.STBA.trips.STBA.stops
      t.equal(stopTimes.length, 3)

      t.match(stopTimes[1], {
        id: 1,
        arrival: '06:00:00',
        departure: '06:00:00',
        pickupType: 0,
        dropoffType: 0,
        stopHeadsign: undefined
      })

      t.match(stopTimes[2], {
        id: 2,
        arrival: '06:20:00',
        departure: '06:20:00',
        pickupType: 0,
        dropoffType: 1,
        stopHeadsign: 'from Here to There'
      })

      t.match(stopTimes[3], {
        id: 3,
        arrival: '06:40:00',
        departure: '06:40:00',
        pickupType: 1,
        dropoffType: 0,
        stopHeadsign: undefined
      })

      t.end()
    })
  })

  t.end()
})

test('warning on malformed stop times', function (t) {
  const transit = initTransit()

  const warnings = []

  // catch console.warn calls
  console.warn = function (msg) {
    warnings.push(msg)
  }

  importStopTimes(path.resolve(__dirname, 'data/malformed-stop-times/stop_times.txt'), transit, function onEnd () {
    const stopTimes = transit.agencies.DTA.routes.STBA.trips.STBA.stops
    t.equal(stopTimes.length, 1)

    t.match(stopTimes[1], {
      id: 1,
      arrival: '06:00:00',
      departure: '06:00:00',
      pickupType: 0,
      dropoffType: 0
    })

    t.equal(warnings.length, 2, 'two times not valid')

    t.end()
  })
})

function initTransit () {
  const transit = new Transit()

  transit.agencies.add(new Agency({
    id: 'DTA',
    name: 'DTA'
  }))

  transit.agencies.DTA.routes.add(new Route({
    longName: 'Some Route'
  }), 'STBA')

  transit.route('STBA').trips.add(new Trip({ id: 'STBA' }), 'STBA')

  ;[
    'STAGECOACH',
    'BEATTY_AIRPORT',
    'EMSI'
  ].forEach(function (code) {
    transit.stops.add(new Stop({
      id: code,
      name: '(Demo)',
      lat: 36.915682,
      lon: -116.751677
    }))
  })

  return transit
}
