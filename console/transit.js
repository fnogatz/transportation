var Transit = require('../lib/transit');

module.exports = {
  fields: {
    '# Agencies': function() { return this.agencies.length; },
    'Agencies': function() { return this.agencies.ids.join('\n'); },
    '# Stops': function() { return this.stops.length; },
    '# Services': function() { return this.services.length; },
  },
  defaultFields: [
    'Agencies',
    '# Stops',
    '# Services',
  ],
  test: function() {
    return this instanceof Transit;
  },
  horizontal: true,
};


