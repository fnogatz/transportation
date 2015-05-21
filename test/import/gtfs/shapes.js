var test = require('tap').test

var Transit = require('../../../lib/transit')
var importShapes = require('../../../lib/import/gtfs/import.shapes')

test('import shape', function (t) {
  var transit = new Transit()

  t.test('err for non-existing file', function (t) {
    importShapes(__dirname + '/data/generic/this_file_does_not_exist.txt', transit, function onEnd (err) {
      // this checks that the import returns an error
      t.ok(err)
      t.end()
    })
  })

  t.end()
})
