module.exports = loadCSV;

var csv = require('csv');
var concat = require('concat-stream');
var fs = require('fs');


function loadCSV(filename, callback) {
  fs.createReadStream(filename)
    .pipe(csv.parse({
      columns: true
    }))
    .pipe(concat(callback));
}
