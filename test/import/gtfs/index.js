var path = require('path')
var test = require('tap').test

var Transit = require('../../../lib/transit')
var importGTFS = require('../../../lib/import/gtfs/index')

test('handles optional files', function (t) {
  t.test('missing shapes.txt', function (t) {
    var transit = new Transit()

    importGTFS.call(transit, path.resolve(__dirname, 'data/no-shapes'), function (err) {
      t.notOk(err)
      t.end()
    })
  })

  t.test('missing calendar.txt if calendar_times.txt is present', function (t) {
    var transit = new Transit()

    importGTFS.call(transit, path.resolve(__dirname, 'data/no-calendar'), function (err) {
      t.notOk(err)
      t.end()
    })
  })

  t.end()
})
