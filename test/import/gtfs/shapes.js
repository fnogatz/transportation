const path = require('path')
const test = require('tap').test

const Transit = require('../../../lib/transit')
const importShapes = require('../../../lib/import/gtfs/import.shapes')

test('import shape', function (t) {
  const transit = new Transit()

  t.test('err for non-existing file', function (t) {
    importShapes(path.resolve(__dirname, 'data/generic/this_file_does_not_exist.txt'), transit, function onEnd (err) {
      // this checks that the import returns an error
      t.ok(err)
      t.end()
    })
  })

  t.end()
})
