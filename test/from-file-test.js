var fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    assertCalled = require('assert-called'),
    lsbRelease = require('../');

fs.readFile = function () {
  var cb = arguments[arguments.length - 1];
  process.nextTick(function () {
    cb(null, fs.readFileSync(path.join(__dirname, 'fixtures', 'ubuntu'), 'utf8'));
  });
};

lsbRelease.fromFile(assertCalled(function (err, data) {
  assert(!err);
  assert.deepEqual(data, {
    "distributorID": "Ubuntu",
    "description": "Ubuntu 12.04.1 LTS",
    "release": "12.04",
    "codename": "precise"
  });
}));
