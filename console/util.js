module.exports = {}
module.exports.allWithProperty = allWithProperty

function allWithProperty (arr, prop) {
  return Array.prototype.every.call(arr, function (el) {
    return (typeof el[prop] !== 'undefined')
  })
}
