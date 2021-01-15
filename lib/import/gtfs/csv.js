module.exports = loadCSV

const csv = require('csv')
const concat = require('concat-stream')
const fs = require('fs')

function loadCSV (filename, callback) {
  const stream = fs.createReadStream(filename)
  stream.on('error', function (error) {
    callback(error)
  })
  stream.pipe(csv.parse({
    columns: true
  }))
    .pipe(concat(callback.bind(null, null)))
}
