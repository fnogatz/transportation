module.exports = Transit;


var AgenciesList = require('./list.agency');
var StopsList = require('./list.stop');
var ServicesList = require('./list.service');
var ShapesList = require('./list.shape');

var importGTFS = require('./import/gtfs/index');


function Transit() {
  this.agencies = new AgenciesList(this);
  this.stops = new StopsList(this);
  this.services = new ServicesList(this);
  this.shapes = new ShapesList(this);

  /**
   * Store the relation route_id > agency_id.
   * @type {Object}
   */
  this._routes = {};

  /**
   * Store the relation trip_id > [agency_id, route_id].
   * @type {Object}
   */
  this._trips = {};
}


Object.defineProperty(Transit.prototype, 'trips', {
  get: function getAllTrips() {
    var self = this;
    var trips = this._trips;
    var res = [];
    for (var tripId in trips) {
      res.push(self.trip(tripId))
    }
    return res;
  }
});


Transit.prototype.importGTFS = importGTFS;


Transit.prototype.route = function getRoute(id) {
  var agencyId = this._routes[id];
  if (!agencyId) {
    return false;
  }

  return this.agencies[agencyId].routes[id];
};


Transit.prototype.trip = function getTrip(id) {
  var ids = this._trips[id];
  if (!ids) {
    return false;
  }

  return this.agencies[ids.agency].routes[ids.route].trips[id];
};
