module.exports = Stop;


function Stop(obj) {
  for (var key in obj) {
    if (obj[key] !== null && obj[key] !== '') {
      this[key] = obj[key];
    }
  }

  if (!obj.name) {
    throw new Error('Stop name must be given.');
  }
}
