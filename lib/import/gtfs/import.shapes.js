module.exports = importShapes
module.exports.optional = true

var csv = require('./csv')
var share = require('./share')

function importShapes (filename, transit, callback) {
  csv(filename, function (err, shapeRows) {
    if (err) {
      return callback(err)
    }

    var shapes = share.groupArray(shapeRows, function byId (shapeRow) {
      return shapeRow.shape_id
    })

    var shape
    for (var shapeId in shapes) {
      shape = getShape(shapes[shapeId])
      shape.id = shapeId
      transit.shapes.add(shape, shapeId)
    }

    callback()
  })
}

function getShape (arr) {
  arr = arr.sort(function (a, b) {
    return parseInt(a.shape_pt_sequence, 10) - parseInt(b.shape_pt_sequence, 10)
  })

  var shape = arr.map(function (shapeRow) {
    var obj = {
      lat: parseFloat(shapeRow.shape_pt_lat),
      lon: parseFloat(shapeRow.shape_pt_lon)
    }

    if (shapeRow.shape_dist_traveled) {
      obj.distance = parseFloat(shapeRow.shape_dist_traveled)
    }

    return obj
  })

  return shape
}
