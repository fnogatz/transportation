module.exports = StopTime

function StopTime (obj) {
  this._stopId = null

  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== '') {
      this[key] = obj[key]
    }
  }
}

Object.defineProperty(StopTime.prototype, '_transit', {
  get: function () {
    return this._list._trip._list._route._list._agency._list._transit
  }
})

Object.defineProperty(StopTime.prototype, 'stop', {
  get: function () {
    if (!this._stopId) {
      return null
    }

    return this._transit.stops[this._stopId]
  }
})

/**
 * Populate properties of Stop into StopTime
 */
const stopProperties = ['lat', 'lon', 'code', 'name']
stopProperties.forEach(function (stopProperty) {
  Object.defineProperty(StopTime.prototype, stopProperty, {
    get: function () {
      if (!this._stopId) {
        return undefined
      }

      return this._transit.stops[this._stopId][stopProperty]
    }
  })
})

/**
 * Insert colons in a time given as HHMMSS to return HH:MM:SS.
 * @param  {String} hhmmss
 * @return {String}
 */
StopTime.prettyTime = function prettyTime (hhmmss) {
  return hhmmss.replace(/^([0-9]{2})([0-9]{2})([0-9]{2})$/, '$1:$2:$3')
}

StopTime.PickupType = {
  RegularlyScheduled: 0,
  NoPickup: 1,
  MustPhone: 2,
  MustCoordinate: 3
}

StopTime.DropoffType = {
  RegularlyScheduled: 0,
  NoDropoff: 1,
  MustPhone: 2,
  MustCoordinate: 3
}
