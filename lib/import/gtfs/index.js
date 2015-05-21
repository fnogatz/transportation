module.exports = importGTFS

var async = require('async')
var path = require('path')

var load = require('require-all')({
  dirname: __dirname,
  filter: /import.(.+)\.js$/,
  excludeDirs: /^\.(git|svn)$/
})

var importOrder = [
  'agency',
  'calendar_dates',
  'calendar',
  'stops',
  'routes',
  'trips',
  'shapes',
  'stop_times'
]

function importGTFS (source, callback) {
  var transit = this

  async.eachSeries(importOrder, function (what, cb) {
    var importer = load[what]

    importer(path.join(source, what + '.txt'), transit, function (err) {
      if (err && err.code === 'ENOENT' && !importer.optional) {
        // file is optional, so omit 'file not found' error
        err = null
      }

      cb(err)
    })
  }, callback)
}
