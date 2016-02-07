var path = require('path')
var test = require('tap').test

var Transit = require('../../../lib/transit')
var Service = require('../../../lib/service')
var importCalendarDates = require('../../../lib/import/gtfs/import.calendar_dates')

test('import calendar dates', function (t) {
  var transit = new Transit()

  importCalendarDates(path.resolve(__dirname, 'data/generic/calendar_dates.txt'), transit, function onEnd () {
    t.equal(transit.services.length, 1)

    t.ok(transit.services['FULLW'])
    t.equal(transit.services['FULLW'].exceptions['20070604'], Service.Exception.Removed)

    t.end()
  })
})
