module.exports = Service

const moment = require('moment')

const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

function Service (id) {
  this.id = id

  this.days = {
    monday: Service.Status.Unknown,
    tuesday: Service.Status.Unknown,
    wednesday: Service.Status.Unknown,
    thursday: Service.Status.Unknown,
    friday: Service.Status.Unknown,
    saturday: Service.Status.Unknown,
    sunday: Service.Status.Unknown
  }

  this.exceptions = {}
}

/**
 * Add an exception for the given date.
 *   A service can either be added or removed for this date.
 * @param {String} date    of format YYYYMMDD
 * @param {[type]} type    one of Service.Exception
 */
Service.prototype.addException = function addException (date, type) {
  this.exceptions[date] = type
}

/**
 * Check whether the given Service is operating on a given date.
 * @param  {Date} date
 * @return {Bool}
 */
Service.prototype.operating = function operatingOnDate (date) {
  date = date || new Date()
  date = moment(date)

  const day = days[date.day()]
  const yyyymmdd = date.format('YYYYMMDD')

  // Check start and end
  if (this.start && this.start > yyyymmdd) {
    return false
  }
  if (this.end && this.end < yyyymmdd) {
    return false
  }

  // Check Exceptions
  if (this.exceptions[yyyymmdd] && this.exceptions[yyyymmdd] === Service.Status.Operating) {
    // Operating
    return true
  }
  if (this.exceptions[yyyymmdd] && this.exceptions[yyyymmdd] === Service.Status.NotOperating) {
    // Not Operating
    return false
  }

  if (this.days[day] === 1) {
    // Operating
    return true
  }

  return false
}

/**
 * Following the GTFS semantics for exceptions.
 * @type {Object}
 */
Service.Exception = {
  Added: 1,
  Removed: 2
}

/**
 * Get the name of an exception
 * @param  {Integer} exception
 * @return {String}
 */
Service.Exception.toString = function exceptionToString (exception) {
  for (const type in Service.Exception) {
    if (Service.Exception[type] === exception) {
      return type
    }
  }

  return '(unknown)'
}

Service.Status = {
  Operating: 1,
  NotOperating: -1,
  Unknown: 0
}
