// Copyright 2012 Daniel Connelly.
// Released under the Simplified (2-clause) BSD License.
// See http://dhconnelly.com/prettybnf or the LICENSE file for more details.

(function (exports, imports) {
'use strict';

exports.version = '0.0.0';
exports.parse = parse;

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

}(typeof exports === 'undefined' ? this.erratic = {} : exports, {
    prettybnf: this.prettybnf || require('prettybnf')
}));
