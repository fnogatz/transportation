module.exports = {}
module.exports.toGeoJSON = toGeoJSON
module.exports.toLonLat = toLonLat

var turf = require('./turf')

function toLonLat (row) {
  return [ row.lon, row.lat ]
}

function toGeoJSON (type) {
  var points = this

  if (type === 'linestring') {
    return turf.linestring(points.map(toLonLat))
  }

  // default: type === 'featurecollection'
  var features = points.map(function (point) {
    return turf.point(toLonLat(point), {
      time: point.time,
      distance: point.distance,
      travelDistance: point.travelDistance
    })
  })
  return turf.featurecollection(features)
}
