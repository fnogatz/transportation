module.exports = importCalendarDates;

var Service = require('../../service');
var csv = require('./csv');


function importCalendarDates(filename, transit, callback) {
  var services = transit.services;

  csv(filename, function(exceptions) {
    exceptions.forEach(function(exceptionRow) {
      var service;
      if (!services[exceptionRow.service_id]) {
        service = new Service(exceptionRow.service_id);
        services.add(service);
      } 
      else {
        service = services[exceptionRow.service_id];
      }

      var exception = parseInt(exceptionRow.exception_type);
      service.addException(exceptionRow.date, exception);
    });

    callback();
  });
}
