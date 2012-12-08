// Copyright 2012 Daniel Connelly.
// Released under the Simplified (2-clause) BSD License.
// See http://dhconnelly.com/prettybnf or the LICENSE file for more details.

/*jshint node: true */

'use strict';

var erratic = require('./erratic');

exports.testVersion = function (t) {
    t.equal(erratic.version, '0.0.0');
    t.done();
};
