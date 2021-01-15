const path = require('path')
const test = require('tap').test

const Transit = require('../../../lib/transit')
const Service = require('../../../lib/service')
const importCalendar = require('../../../lib/import/gtfs/import.calendar')

test('import calendar dates', function (t) {
  const transit = new Transit()

  importCalendar(path.resolve(__dirname, 'data/generic/calendar.txt'), transit, function onEnd () {
    t.equal(transit.services.length, 2)

    t.ok(transit.services.FULLW)
    t.ok(transit.services.WE)

    const operating = {
      monday: ['FULLW'],
      tuesday: ['FULLW'],
      wednesday: ['FULLW'],
      thursday: ['FULLW'],
      friday: ['FULLW'],
      saturday: ['FULLW', 'WE'],
      sunday: ['FULLW', 'WE']
    }
    const services = ['FULLW', 'WE']
    services.forEach(function checkService (service) {
      for (const day in operating) {
        if (operating[day].indexOf(service) >= 0) {
          t.equal(transit.services[service].days[day], Service.Status.Operating)
        } else {
          t.equal(transit.services[service].days[day], Service.Status.NotOperating)
        }
      }
    })

    t.equal(transit.services.FULLW.start, '20070101')
    t.equal(transit.services.FULLW.end, '20101231')
    t.equal(transit.services.WE.start, '20070101')
    t.equal(transit.services.WE.end, '20101231')

    t.end()
  })
})
