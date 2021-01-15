const path = require('path')
const test = require('tap').test

const Transit = require('../../../lib/transit')
const Service = require('../../../lib/service')
const importCalendarDates = require('../../../lib/import/gtfs/import.calendar_dates')

test('import calendar dates', function (t) {
  const transit = new Transit()

  importCalendarDates(path.resolve(__dirname, 'data/generic/calendar_dates.txt'), transit, function onEnd () {
    t.equal(transit.services.length, 1)

    t.ok(transit.services.FULLW)
    t.equal(transit.services.FULLW.exceptions['20070604'], Service.Exception.Removed)

    t.end()
  })
})
