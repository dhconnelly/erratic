// Copyright 2012 Daniel Connelly.
// Released under the Simplified (2-clause) BSD License.
// See http://dhconnelly.com/prettybnf or the LICENSE file for more details.

/*jshint node: true */

'use strict';

var erratic = require('./erratic'), prettybnf = require('prettybnf');

exports.testVersion = function (t) {
    t.equal(erratic.version, '0.0.0');
    t.done();
};

var grammar = '<list> ::= "<" <items> ">";\n' +
              '<items> ::= <items> " " <item> | <item>;\n' +
              '<item> ::= "foo" | "bar" | "baz" | <list>;\n';

exports.testParse = function (t) {
    var rules = erratic.parse(grammar);
    t.deepEqual(Object.keys(rules), ['list', 'items', 'item']);
    t.deepEqual(rules.items, [
        [{ type: 'nonterminal', text: 'items' },
         { type: 'terminal', text: ' ' },
         { type: 'nonterminal', text: 'item' }],
        [{ type: 'nonterminal', text: 'item' }]
    ]);
    t.done();
};
