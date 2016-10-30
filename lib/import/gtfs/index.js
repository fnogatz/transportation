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

  var status = {
    imported: {}
  }

  async.eachSeries(importOrder, function (what, cb) {
    var importer = load[what]

    importer(path.join(source, what + '.txt'), transit, function (err) {
      if (err && err.code === 'ENOENT') {
        if (err && importer.optional === true) {
          // file is optional, so omit 'file not found' error
          err = null
        }

        if (err &&
          typeof importer.optional === 'function' &&
          importer.optional(transit, status)) {
          // file is optional, so omit 'file not found' error
          err = null
        }
      }

      status.imported[what] = true

      cb(err)
    })
  }, callback)
}
