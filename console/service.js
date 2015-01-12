var Service = require('../lib/service');

module.exports = {
  fields: {
    'ID': function() { return this.id; },
    '# Exceptions': function() { return Object.keys(this.exceptions).length; },
    'Exceptions': function() { return getExceptions(this.exceptions); },
    'Operating': function() { return getOperatingDays(this.days); },
    'Start': function() { return this.start; },
    'End': function() { return this.end; },
  },
  defaultFields: [
    'ID',
    'Start',
    'End',
    'Operating',
    '# Exceptions',
  ],
  test: function() {
    return this instanceof Service;
  }
};


function getExceptions(exceptions) {
  return '';
  // TODO
}


function getOperatingDays(days) {
  var operatingDays = [];
  for (var day in days) {
    if (days[day] === Service.Status.Operating) {
      operatingDays.push(capitalize(day));
    }
  }
  return operatingDays.join('\n');
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
