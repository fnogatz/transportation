var test = require('tap').test;

var Transit = require('../../../lib/transit');
var Service = require('../../../lib/service');
var importCalendarDates = require('../../../lib/import/gtfs/import.calendar_dates');


test('import calendar dates', function(t) {
  var transit = new Transit();

  importCalendarDates('./data/calendar_dates.txt', transit, function onEnd() {
    t.equal(transit.services.length, 1);

    t.ok(transit.services['Su']);
    t.equal(transit.services['Su'].exceptions['20121227'], Service.Exception.Removed);
    t.equal(transit.services['Su'].exceptions['20121228'], Service.Exception.Added);

    t.end();
  });
});
