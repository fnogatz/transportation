module.exports = {}
module.exports.groupArray = groupArray

function groupArray (elements, byFunction) {
  var groups = {}
  elements.forEach(function (el) {
    var res = byFunction(el)
    if (!groups[res]) {
      groups[res] = []
    }
    groups[res].push(el)
  })

  return groups
}
