module.exports = importRoutes

const Route = require('../../route')
const csv = require('./csv')

function importRoutes (filename, transit, callback) {
  csv(filename, function (err, routes) {
    if (err) {
      return callback(err)
    }

    let agency = null

    if (!routes[0].agency_id) {
      // no Agency ID set - take the only one as default
      if (transit.agencies.length === 1) {
        agency = transit.agencies.toArray()[0]
      } else {
        throw new Error('Multiple agencies specified but no agency ID given!')
      }
    }

    routes.forEach(function (routeRow) {
      const obj = {
        // Required fields by GTFS
        id: routeRow.route_id,
        type: routeRow.route_type
      }

      // One of short_name and long_name must be set
      //   according to GTFS
      if (routeRow.route_short_name) {
        obj.shortName = routeRow.route_short_name
      }
      if (routeRow.route_long_name) {
        obj.longName = routeRow.route_long_name
      }

      const route = new Route(obj)

      // Optional fields
      if (routeRow.route_color) {
        route.color = routeRow.route_color
      }
      if (routeRow.route_text_color) {
        route.textColor = routeRow.route_text_color
      }

      const agencyId = routeRow.agency_id || agency.id

      transit.agencies[agencyId].routes.add(route, route.id)
    })

    callback()
  })
}
