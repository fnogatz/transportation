module.exports = importShapes
module.exports.optional = true

const csv = require('./csv')
const share = require('./share')

function importShapes (filename, transit, callback) {
  csv(filename, function (err, shapeRows) {
    if (err) {
      return callback(err)
    }

    const shapes = share.groupArray(shapeRows, function byId (shapeRow) {
      return shapeRow.shape_id
    })

    let shape
    for (const shapeId in shapes) {
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

  const shape = arr.map(function (shapeRow) {
    const obj = {
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
