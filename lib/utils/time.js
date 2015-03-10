var moment = require('moment');


module.exports.guess = function guessTime(time1, time2, ratio, options) {
  options = options || {};

  // TODO: Replace for example by gaussian, given as option
  var progress = ratio;

  if (time1 instanceof Date && time2 instanceof Date) {
    var timestamp = Math.round((time2.getTime()-time1.getTime()) * progress + time1.getTime());
    return new Date(timestamp);
  }

  if (typeof time1 === 'string' && typeof time2 === 'string') {
    var t1 = moment(time1, 'HH:mm:ss');
    var t2 = moment(time2, 'HH:mm:ss');
    var diff = t2.diff(t1);
    return moment(t1.add(Math.abs(diff * progress))).format('HH:mm:ss.SSS');
  }

  throw new Error("Can't guess time for "+time1+", "+time2);
}
