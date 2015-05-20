var test = require('tap').test

var Transit = require('../../../lib/transit')
var importShapes = require('../../../lib/import/gtfs/import.shapes')

test('import shape', function (t) {
  var transit = new Transit()

  // shapes is not required, so should not throw an error if file does not exist
  importShapes(__dirname + '/data/generic/this_file_does_not_exist.txt', transit, function onEnd () {
    // this checks that the import does not throw and has an undefined shapes property
    t.equal(transit.shapes, undefined)
    t.end()
  })
})
