// Copyright 2012 Daniel Connelly.
// Released under the Simplified (2-clause) BSD License.
// See http://dhconnelly.com/prettybnf or the LICENSE file for more details.

/*jshint node: true */

'use strict';

var erratic = require('./erratic'), prettybnf = require('prettybnf');

exports.testVersion = function (t) {
    t.equal(erratic.version, '0.1.0');
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

exports.testGenerate = function (t) {
    var rules = erratic.parse(grammar);
    for (var i = 0; i < 100; i++) {
        parse(erratic.generate(rules, 'list'));
    }
    t.done();
};

// ---------------------------------------------------------------------------
// Parser for the test list grammar

exports.testTestListParser = function (t) {
    var list = '<foo bar <baz> <<baz> <bar foo>>>';
    var ast = parse(list);
    t.deepEqual(ast, ['foo', 'bar', ['baz'], [['baz'], ['bar', 'foo']]]);
    t.done();
};

var parse = (function () {
    var input, pos, EOF = 'EOF';

    function eat(expected) {
        var ch = peek();
        if (expected !== undefined && ch !== expected) {
            throw new SyntaxError('Expected ' + expected + ', got ' + ch);
        }
        pos++;
        return ch;
    }

    function peek() {
        return (pos < input.length) ? input[pos] : EOF;
    }

    function item() {
        switch (peek()) {
        case '<': return list();
        case 'f': eat('f'); eat('o'); eat('o'); return 'foo';
        case 'b': eat('b'); eat('a');
            if (peek() === 'r') {
                eat('r'); return 'bar';
            }
            eat('z'); return 'baz';
        }
        throw new SyntaxError('Unknown item');
    }

    function items() {
        var ret = [item()];
        while (peek() === ' ') {
            eat(' ');
            ret.push(item());
        }
        return ret;
    }

    function list() {
        eat('<');
        var ret = items();
        eat('>');
        return ret;
    }

    return function (str) {
        input = str;
        pos = 0;
        return list();
    };
}());
