var fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    child_process = require('child_process'),
    assertCalled = require('assert-called'),
    lsbRelease = require('../');

child_process.exec = function () {
  var cb = arguments[arguments.length - 1];
  process.nextTick(function () {
    cb(null, fs.readFileSync(path.join(__dirname, 'fixtures', 'fedora')), new Buffer(0));
  });
};

lsbRelease.fromCommand(assertCalled(function (err, data) {
  assert(!err);
  assert.deepEqual(data, {
    "lsbVersion": ":core-4.0-amd64:core-4.0-noarch",
    "distributorID": "Fedora",
    "description": "Fedora release 14 (Laughlin)",
    "release": "14",
    "codename":"Laughlin"
  });
}));
