module.exports = importCalendarDates
module.exports.optional = true

var Service = require('../../service')
var csv = require('./csv')

function importCalendarDates (filename, transit, callback) {
  var services = transit.services

  csv(filename, function (err, exceptions) {
    if (err) {
      return callback(err)
    }

    exceptions.forEach(function (exceptionRow) {
      var service
      if (!services[exceptionRow.service_id]) {
        service = new Service(exceptionRow.service_id)
        services.add(service)
      } else {
        service = services[exceptionRow.service_id]
      }

      var exception = parseInt(exceptionRow.exception_type, 10)
      service.addException(exceptionRow.date, exception)
    })

    callback()
  })
}
