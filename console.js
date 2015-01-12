var required = require('require-all')(__dirname + '/console');

var config = {};
for (var key in required) {
  config[key.replace(/^array\./, 'array:')] = required[key];
}

var konsole = require('tconsole')(config);

module.exports = konsole;
