var test = require('tap').test

var Transit = require('../../../lib/transit')
var Service = require('../../../lib/service')
var importCalendar = require('../../../lib/import/gtfs/import.calendar')

test('import calendar dates', function (t) {
  var transit = new Transit()

  importCalendar(__dirname + '/data/generic/calendar.txt', transit, function onEnd () {
    t.equal(transit.services.length, 2)

    t.ok(transit.services['FULLW'])
    t.ok(transit.services['WE'])

    var operating = {
      monday: ['FULLW'],
      tuesday: ['FULLW'],
      wednesday: ['FULLW'],
      thursday: ['FULLW'],
      friday: ['FULLW'],
      saturday: ['FULLW', 'WE'],
      sunday: ['FULLW', 'WE']
    }
    var services = ['FULLW', 'WE']
    services.forEach(function checkService (service) {
      for (var day in operating) {
        if (operating[day].indexOf(service) >= 0) {
          t.equal(transit.services[service].days[day], Service.Status.Operating)
        } else {
          t.equal(transit.services[service].days[day], Service.Status.NotOperating)
        }
      }
    })

    t.equal(transit.services['FULLW'].start, '20070101')
    t.equal(transit.services['FULLW'].end, '20101231')
    t.equal(transit.services['WE'].start, '20070101')
    t.equal(transit.services['WE'].end, '20101231')

    t.end()
  })
})
