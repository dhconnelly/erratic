// Copyright 2012 Daniel Connelly.
// Released under the Simplified (2-clause) BSD License.
// See http://dhconnelly.com/erratic or the LICENSE file for more details.

(function (exports, imports) {
'use strict';

exports.version = '0.1.0';
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

function rand(max) {
    return Math.floor(Math.random() * max);
}

function generate(rules, rule, maxdepth) {
    // create a new stack frame
    // rule: the name of the rule
    // rhs: the index of the chosen rhs
    // acc: the expanded terms accumulated so far
    function newframe(rule, rhs, acc) {
        return { rule: rule, rhs: rhs, acc: acc };
    }

    var stack = [newframe(rule, rand(rules[rule].length), [])],
        retval;

activation:
    while (stack.length) {
        var frame = stack[stack.length-1];
        var rhs = rules[frame.rule][frame.rhs];
        var acc = frame.acc;

        if (retval) {
            acc.push(retval);
            retval = null;
        }

        while (acc.length < rhs.length) {
            var term = rhs[acc.length];
            var name = term.text;
            // suspend frame and expand nonterminals
            if (term.type !== 'terminal') {
                stack.push(newframe(name, rand(rules[name].length), []));
                continue activation;
            }
            // immediately accumulate terminals
            acc.push(name);
        }

        stack.pop();
        retval = acc.join('');
    }

    return retval;
}

}(typeof exports === 'undefined' ? this.erratic = {} : exports, {
    prettybnf: this.prettybnf || require('prettybnf')
}));
