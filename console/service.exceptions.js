var Service = require('../lib/service')

module.exports = {
  defaultFields: [
    'Date',
    'Exception'
  ],
  insert: function (table, fields) {
    var exceptions = this
    Object.keys(exceptions).sort().forEach(function addException (date) {
      var row = [ date, Service.Exception.toString(exceptions[date]) ]
      table.push(row)
    })
  },
  test: function () {
    return (typeof this === 'object' && isYYYYMMDD(Object.keys(this)))
  }
}

function isYYYYMMDD (input) {
  if (typeof input === 'string') {
    return /^[0-9]{4}[0-1][0-9][0-3][0-9]$/.test(input)
  }
  if (typeof input === 'object' && input instanceof Array) {
    return input.every(isYYYYMMDD)
  }
  return false
}
