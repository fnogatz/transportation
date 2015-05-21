var test = require('tap').test

var Transit = require('../../../lib/transit')
var importGTFS = require('../../../lib/import/gtfs/index')

test('handles optional files', function (t) {
  t.test('missing shapes.txt', { todo: true }, function (t) {
    var transit = new Transit()

    importGTFS.call(transit, __dirname + '/data/generic', function (err) {
      t.notOk(err)
      t.end()
    })
  })

  t.end()
})
