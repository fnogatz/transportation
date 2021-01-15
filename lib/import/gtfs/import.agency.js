module.exports = importAgencies

const Agency = require('../../agency')
const csv = require('./csv')

function importAgencies (filename, transit, callback) {
  csv(filename, function (err, agencies) {
    if (err) {
      return callback(err)
    }

    agencies.forEach(function (agencyRow) {
      const agency = new Agency({
        // Required fields in GTFS
        name: agencyRow.agency_name,
        url: agencyRow.agency_url,
        timezone: agencyRow.agency_timezone
      })

      // optional fields in GTFS
      if (agencyRow.agency_lang) {
        agency.language = agencyRow.agency_lang
      }
      if (agencyRow.agency_id) {
        agency.id = agencyRow.agency_id
      }

      transit.agencies.add(agency)
    })

    callback()
  })
}
