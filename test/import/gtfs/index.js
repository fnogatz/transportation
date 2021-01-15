const path = require('path')
const test = require('tap').test

const Transit = require('../../../lib/transit')
const importGTFS = require('../../../lib/import/gtfs/index')

test('handles optional files', function (t) {
  t.test('missing shapes.txt', function (t) {
    const transit = new Transit()

    importGTFS.call(transit, path.resolve(__dirname, 'data/no-shapes'), function (err) {
      t.notOk(err)
      t.end()
    })
  })

  t.test('missing calendar.txt if calendar_times.txt is present', function (t) {
    const transit = new Transit()

    importGTFS.call(transit, path.resolve(__dirname, 'data/no-calendar'), function (err) {
      t.notOk(err)
      t.end()
    })
  })

  t.end()
})
