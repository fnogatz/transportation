module.exports = importGTFS;

var async = require('async');
var path = require('path');


var load = require('require-all')({
  dirname     :  __dirname,
  filter      :  /import.(.+)\.js$/,
  excludeDirs :  /^\.(git|svn)$/
});

var importOrder = [
  'agency',
  'calendar_dates',
  'calendar',
  'stops',
  'routes',
  'trips',
  'shapes',
  'stop_times',
];


function importGTFS(source, callback) {
  var transit = this;

  async.eachSeries(importOrder, function(what, cb) {
    load[what](path.join(source, what+'.txt'), transit, cb);
  }, callback);
}
