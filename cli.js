#!/usr/bin/env node
// Copyright 2012 Daniel Connelly.
// Released under the Simplified (2-clause) BSD License.
// See http://dhconnelly.com/erratic or the LICENSE file for more details.

/*jshint node: true */

'use strict';

var erratic = require('./erratic'), fs = require('fs');
var USAGE = 'Usage: erratic <grammar_file> <top_level_rule>';

function main(args, done) {
    if (args[2] === '--help') {
        process.stderr.write(USAGE + '\n');
        return 0;
    }

    var grammar = args[2], rule = args[3];
    if (!grammar || !rule) {
        process.stderr.write('Must provide grammar and top-level rule\n');
        process.stderr.write(USAGE + '\n');
        return 1;
    }

    var rules;
    try {
        var data = fs.readFileSync(args[2], 'utf8');
        rules = erratic.parse(data);
    } catch (err) {
        process.stderr.write(err.name + ': ' + err.message + '\n');
        return 1;
    }
    if (rules[rule] === undefined) {
        process.stderr.write('No such rule: ' + rule + '\n');
        return 1;
    }
    process.stdout.write(erratic.generate(rules, rule));
    process.stdout.write('\n');
    return 0;
}

return main(process.argv);
