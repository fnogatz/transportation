module.exports = importCalendar

var Service = require('../../service')
var csv = require('./csv')

function importCalendar (filename, transit, callback) {
  csv(filename, function (err, services) {
    if (err) {
      throw err
    }

    services.forEach(function (serviceRow) {
      var service
      if (!transit.services[serviceRow.service_id]) {
        service = new Service(serviceRow.service_id)
        transit.services.add(service)
      } else {
        service = transit.services[serviceRow.service_id]
      }

      service.start = serviceRow.start_date
      service.end = serviceRow.end_date

      var days = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ]
      days.forEach(function (day) {
        if (serviceRow[day] === '1') {
          service.days[day] = Service.Status.Operating
        } else if (serviceRow[day] === '0') {
          service.days[day] = Service.Status.NotOperating
        }
      })
    })

    callback()
  })
}
