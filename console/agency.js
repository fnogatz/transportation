var Agency = require('../lib/agency');

module.exports = {
  fields: {
    'ID': function() { return this.id; },
    'Name': function() { return this.name; },
    'URL': function() { return this.url; },
    'Timezone': function() { return this.timezone; },
    'Language': function() { return this.language; },
    '# Routes': function() { return this.routes.length; }
  },
  test: function() {
    return this instanceof Agency;
  }
};
