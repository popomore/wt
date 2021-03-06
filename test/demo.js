/**!
 * wt - test/demo.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var wt = require('../');

var fixtures = path.join(__dirname, 'fixtures');
var watcher = wt.watch(fixtures);

watcher.on('all', function (info) {
  console.log(info.event, info.remove, info.path);
});

setInterval(function () {
  fs.writeFile(path.join(fixtures, 'foo.demo.txt'), 'foo demo', function () {});
  fs.rmdir(path.join(fixtures, 'demodir'), function () {
    fs.mkdir(path.join(fixtures, 'demodir'), function () {
      fs.rename(path.join(fixtures, 'demodir'), path.join(fixtures, 'demodir2'), function () {
        fs.rename(path.join(fixtures, 'demodir'), path.join(fixtures, 'demodir'), function () {});
      });
    });
  });
}, 100);
