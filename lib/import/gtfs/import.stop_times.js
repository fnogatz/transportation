module.exports = importStopTimes

const StopTime = require('../../stop_time')
const csv = require('./csv')
const share = require('./share')

function importStopTimes (filename, transit, callback) {
  csv(filename, function (err, stopTimeRows) {
    if (err) {
      return callback(err)
    }

    const stopTimes = share.groupArray(stopTimeRows, function byId (stopTimeRow) {
      return stopTimeRow.trip_id
    })

    let trip
    let stopTimesArray
    for (const tripId in stopTimes) {
      trip = transit.trip(tripId)

      stopTimesArray = getStopTimes(stopTimes[tripId])
      stopTimesArray.forEach(function (stopTimeObj) {
        const stopTime = new StopTime(stopTimeObj)

        trip.stops.add(stopTime)
      })
    }

    callback()
  })
}

function getStopTimes (arr) {
  arr = arr.sort(function (a, b) {
    return parseInt(a.stop_sequence, 10) - parseInt(b.stop_sequence, 10)
  })

  const stopTimes = arr.reduce(function (result, stopTimeRow) {
    const arrival = hhmmss(stopTimeRow.arrival_time)
    const departure = hhmmss(stopTimeRow.departure_time)

    if (arrival === null) {
      console.warn('No valid arrival time: ' + stopTimeRow.arrival_time)
      return result
    }
    if (departure === null) {
      console.warn('No valid departure time: ' + stopTimeRow.departure_time)
      return result
    }

    const obj = {
      arrival: arrival,
      departure: departure,
      _stopId: stopTimeRow.stop_id,
      pickupType: parseInt(stopTimeRow.pickup_type, 10) || 0,
      dropoffType: parseInt(stopTimeRow.drop_off_type, 10) || 0,
      stopHeadsign: stopTimeRow.stop_headsign
    }

    if (stopTimeRow.shape_dist_traveled) {
      obj.distance = parseFloat(stopTimeRow.shape_dist_traveled)
    }

    result.push(obj)

    return result
  }, [])

  return stopTimes
}

/**
 * Return a eight-digit HH:MM:SS time format.
 * @param  {String} time
 * @return {String}
 */
function hhmmss (time) {
  if (time.length === 7) {
    return '0' + time
  }
  if (time.length === 8) {
    return time
  }
  return null
}
