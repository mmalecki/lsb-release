var child_process = require('child_process');

var keys = {
  'LSB Version': 'lsbVersion',
  'Distributor ID': 'distributorID',
  'Description': 'description',
  'Release': 'release',
  'Codename': 'codename'
};

module.exports = function (cb) {
  var result = {};

  child_process.exec('lsb_release -a', function (err, stdout, stderr) {
    if (err) return cb(err);

    stdout.toString().split('\n').forEach(function (l) {
      var key, val, pos = l.indexOf(':');

      if (pos === -1) return;

      key = keys[l.substr(0, pos)];

      result[key] = l.substr(pos + 1).trim();
    });

    cb(null, result);
  });
};
