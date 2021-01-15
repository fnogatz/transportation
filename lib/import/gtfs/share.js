module.exports = {}
module.exports.groupArray = groupArray

function groupArray (elements, byFunction) {
  const groups = {}
  elements.forEach(function (el) {
    const res = byFunction(el)
    if (!groups[res]) {
      groups[res] = []
    }
    groups[res].push(el)
  })

  return groups
}
