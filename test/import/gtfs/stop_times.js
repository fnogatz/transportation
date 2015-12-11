var test = require('tap').test

var Transit = require('../../../lib/transit')
var Agency = require('../../../lib/agency')
var Route = require('../../../lib/route')
var Trip = require('../../../lib/trip')
var Stop = require('../../../lib/stop')
var importStopTimes = require('../../../lib/import/gtfs/import.stop_times')

test('import stop_times', function (t) {
  var transit = initTransit()

  t.test('pickup time', function (t) {
    importStopTimes(__dirname + '/data/pickup-dropoff-types/stop_times.txt', transit, function onEnd () {
      var stopTimes = transit.agencies.DTA.routes.STBA.trips.STBA.stops
      t.equal(stopTimes.length, 3)

      t.similar(stopTimes[1], {
        id: 1,
        arrival: '06:00:00',
        departure: '06:00:00',
        pickupType: 0,
        dropoffType: 0,
        stopHeadsign: undefined
      })

      t.similar(stopTimes[2], {
        id: 2,
        arrival: '06:20:00',
        departure: '06:20:00',
        pickupType: 0,
        dropoffType: 1,
        stopHeadsign: 'from Here to There'
      })

      t.similar(stopTimes[3], {
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
  var transit = initTransit()

  var warnings = []

  // catch console.warn calls
  console.warn = function (msg) {
    warnings.push(msg)
  }

  importStopTimes(__dirname + '/data/malformed-stop-times/stop_times.txt', transit, function onEnd () {
    var stopTimes = transit.agencies.DTA.routes.STBA.trips.STBA.stops
    t.equal(stopTimes.length, 1)

    t.similar(stopTimes[1], {
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
  var transit = new Transit()

  transit.agencies.add(new Agency({
    id: 'DTA',
    name: 'DTA'
  }))

  transit.agencies.DTA.routes.add(new Route({
    longName: 'Some Route'
  }), 'STBA')

  transit.route('STBA').trips.add(new Trip({id: 'STBA'}), 'STBA')

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
