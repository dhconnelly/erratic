// Copyright 2012 Daniel Connelly.
// Released under the Simplified (2-clause) BSD License.
// See http://dhconnelly.com/prettybnf or the LICENSE file for more details.

(function (exports, imports) {
'use strict';

exports.version = '0.0.0';
exports.parse = parse;
exports.generate = generate;

var prettybnf = imports.prettybnf;

function extract(prop, o) {
    return o[prop];
}

function parse(grammar) {
    var ast = prettybnf.parse(grammar);
    var rules = {};
    ast.productions.forEach(function (prod) {
        rules[prod.lhs.text] = prod.rhs.map(extract.bind(null, 'terms'));
    });
    return rules;
}

function choose(things) {
    return things[Math.floor(Math.random() * things.length)];
}

function generateTerm(rules, term) {
    return (term.type === 'terminal') ? term.text : generate(rules, term.text);
}

function generate(rules, rule) {
    return choose(rules[rule]).map(generateTerm.bind(null, rules)).join('');
}

}(typeof exports === 'undefined' ? this.erratic = {} : exports, {
    prettybnf: this.prettybnf || require('prettybnf')
}));
