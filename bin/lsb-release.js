#!/usr/bin/env node
// Named `lsb-release.js` to avoid confusion
require('../')(function (e, result) {
  if (e) {
    console.log(JSON.stringify({ error: e.message }));
    process.exit(1);
  }

  console.log(JSON.stringify(result));
});
