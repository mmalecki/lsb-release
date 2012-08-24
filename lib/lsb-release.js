var exec = require('child_process').exec;

module.exports = function (cb) {
  var result = {};

  exec('lsb_release -a', function (err, stdout, stderr) {
    if (err) return cb(err);
    stdout = stdout.toString().split('\n');
    stdout.forEach(function (l) {
      var key, val, pos = l.indexOf(':');

      if (pos === -1) return;

      key = l.substr(0, pos);

      key = ({
        'LSB Version': 'lsbVersion',
        'Distributor ID': 'distributorID',
        'Description': 'description',
        'Release': 'release',
        'Codename': 'codename'
      })[key];

      result[key] = l.substr(pos + 1).trim();
    });

    cb(null, result);
  });
};
