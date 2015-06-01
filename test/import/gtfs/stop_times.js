var test = require('tap').test

var Transit = require('../../../lib/transit')
var Agency = require('../../../lib/agency')
var Route = require('../../../lib/route')
var Trip = require('../../../lib/trip')
var Stop = require('../../../lib/stop')
var importStopTimes = require('../../../lib/import/gtfs/import.stop_times')

test('import stop_times', function (t) {
  var transit = new Transit()

  transit.agencies.add(new Agency({
    id: 'DTA',
    name: 'DTA'
  }))

  transit.agencies.DTA.routes.add(new Route({
    longName: 'Some Route'
  }), 'STBA')

  transit.route('STBA').trips.add(new Trip({id: 'STBA'}), 'STBA')

  transit.stops.add(new Stop({
    id: 'STAGECOACH',
    name: 'Stagecoach Hotel & Casino (Demo)',
    lat: 36.915682,
    lon: -116.751677
  }))

  importStopTimes(__dirname + '/data/pickup-dropoff-types/stop_times.txt', transit, function onEnd () {
    var stopTimes = transit.agencies.DTA.routes.STBA.trips.STBA.stops
    t.equal(stopTimes.length, 3)

    t.similar(stopTimes[1], {
      id: 1,
      arrival: '06:00:00',
      departure: '06:00:00',
      pickupType: 0,
      dropoffType: 0
    })

    t.similar(stopTimes[2], {
      id: 2,
      arrival: '06:20:00',
      departure: '06:20:00',
      pickupType: 0,
      dropoffType: 1
    })

    t.similar(stopTimes[3], {
      id: 3,
      arrival: '06:40:00',
      departure: '06:40:00',
      pickupType: 1,
      dropoffType: 0
    })

    t.end()
  })
})
