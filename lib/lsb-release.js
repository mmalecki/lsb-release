var fs = require('fs'),
    child_process = require('child_process');

var execKeys = {
  'LSB Version': 'lsbVersion',
  'Distributor ID': 'distributorID',
  'Description': 'description',
  'Release': 'release',
  'Codename': 'codename'
};

var fileKeys = {
  'DISTRIB_ID': 'distributorID',
  'DISTRIB_RELEASE': 'release',
  'DISTRIB_CODENAME': 'codename',
  'DISTRIB_DESCRIPTION': 'description'
};

function parse(data, delimeter, keyMap, valueMap) {
  var result = {};

  data.split('\n').forEach(function (l) {
    var key, val, pos = l.indexOf(delimeter);

    if (pos === -1) return;

    key = keyMap[l.substr(0, pos)];

    result[key] = l.substr(pos + 1).trim();

    if (valueMap) {
      result[key] = valueMap(result[key]);
    }
  });
  return result;
}

module.exports = function (cb) {
  module.exports.fromFile(function (err, data) {
    //
    // First try to read `/etc/lsb-release`, which is present on Ubuntu but not
    // on, for example, Fedora.
    //
    if (err) {
      return module.exports.fromCommand(cb);
    }
    cb(null, data);
  });
};

module.exports.fromCommand = function fromCommand(cb) {
  child_process.exec('lsb_release -a', function (err, stdout, stderr) {
    if (err) return cb(err);
    cb(null, parse(stdout.toString('utf8'), ':', execKeys));
  });
};

module.exports.fromFile = function fromFile(cb) {
  fs.readFile('/etc/lsb-release', 'utf8', function (err, data) {
    if (err) return cb(err);
    cb(null, parse(data, '=', fileKeys, function (val) {
      return (val[0] === '"' && val[val.length - 1] === '"')
        ? val.substr(1, val.length - 2)
        : val;
    }));
  });
};
