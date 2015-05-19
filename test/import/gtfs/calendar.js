var test = require('tap').test

var Transit = require('../../../lib/transit')
var Service = require('../../../lib/service')
var importCalendar = require('../../../lib/import/gtfs/import.calendar')

test('import calendar dates', function (t) {
  var transit = new Transit()

  importCalendar('./data/generic/calendar.txt', transit, function onEnd () {
    t.equal(transit.services.length, 2)

    t.ok(transit.services['Na'])
    t.ok(transit.services['Nb'])

    var operating = {
      monday: ['Na'],
      tuesday: ['Na'],
      wednesday: ['Na'],
      thursday: ['Na'],
      friday: [],
      saturday: [],
      sunday: ['Nb']
    }
    var services = ['Na', 'Nb']
    services.forEach(function checkService (service) {
      for (var day in operating) {
        if (operating[day].indexOf(service) >= 0) {
          t.equal(transit.services[service].days[day], Service.Status.Operating)
        } else {
          t.equal(transit.services[service].days[day], Service.Status.NotOperating)
        }
      }
    })

    t.equal(transit.services['Na'].start, '20121209')
    t.equal(transit.services['Na'].end, '20131231')
    t.equal(transit.services['Nb'].start, '20121209')
    t.equal(transit.services['Nb'].end, '20131231')

    t.end()
  })
})
