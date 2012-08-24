# lsb-release [![Build Status](https://secure.travis-ci.org/mmalecki/lsb-release.png)](http://travis-ci.org/mmalecki/lsb-release)
`lsb-release` is a parser for `lsb_release` command output.

## Installation

    npm install lsb-release

## Usage
```js
var lsbRelease = require('lsb-release');

lsbRelease(function (_, data) {
  console.dir(data);
});
```

Will output something similar to:

```
{ lsbVersion: ':core-4.0-amd64:core-4.0-noarch',
  distributorID: 'Fedora',
  description: 'Fedora release 14 (Laughlin)',
  release: '14',
  codename: 'Laughlin' }
```
