erratic
=======

generate random sentences from BNF grammars

About
-----

`erratic` reads a language syntax definition in the form of a Backus-Naur Form
grammar and generates random sentences in that language.  A few example use
cases:

- generate random computer programs for parser benchmarking;
- generate gibberish text from a simple English grammar;
- generate random BNF grammars for some weird meta-thing.

Getting Started
---------------

Get the source code from [GitHub](https://github.com/dhconnelly/erratic) or
just [download](http://dhconnelly.github.com/erratic/erratic.js) the latest
version.  You can also find it as an [npm module](https://npm.im/erratic).

You can use `erratic` both in Node.js apps and in modern browsers.  Only
browsers that implement ECMAScript 5.1 with strict mode are supported.  This
includes Chrome 13+, Firefox 4+, Safari 5.1+, IE 10+, and Opera 12+
([source](http://kangax.github.com/es5-compat-table)).

To use the library in your project:

- in a Node.js app using `npm`: do `npm install erratic` and add
  `var erratic = require('erratic')` to your scripts.
- in a Node.js app, manually: put `erratic.js` into your app's `node_modules`
  folder and add `var erratic = require('erratic')` to your scripts.
- in a browser app: put `erratic.js` somewhere and add the usual
  `<script src="path/to/erratic.js"></script>` tag to your HTML.  This will
  create a global object named `erratic`.

`erratic` depends on [`prettybnf`](http://dhconnelly.github.com/prettybnf), a
BNF grammar parser library.  If you're not using `npm`, you'll need to [get
`prettybnf.js` yourself](http://dhconnelly.github.com/prettybnf/prettybnf.js)
and include it in your app:

- in a Node.js app: put `prettybnf.js` into your app's `node_modules` folder.
- in a browser app: put `<script src="path/to/prettybnf.js"></script>` *above*
  the `<script src="path/to/erratic.js"></script>` tag in your HTML.

Usage
-----

There are three top-level exports on the `erratic` object:

    {
        version: '0.1.0', // defines your version of the library
        parse: function (grammar) {}, // String -> Object
        generate: function (rules, rule) {}, // (Object, String) -> String
    }

The `parse` function uses `prettybnf` to parse the provided BNF grammar and
build a `rules` object used for generating sentences.  The `generate` function
takes a `rules` object returned from `parse` and the name of a rule to generate
(ie, a `<nonterminal>`) and generates a sentence from that rule.

Example
-------

Consider the following grammar, which you might have saved in the file `g.bnf`:

    <list>  ::=  "<" <items> ">"               ;
    <items> ::=  <items> " " <item> | <item>   ;
    <item>  ::=  "foo" | "bar" | "baz"         ;

To read this grammar from the file, parse it, and generate a random `<list>`,
you might do the following:

    // Node.js specific:
    var erratic = require('erratic'), fs = require('fs');
    var g = fs.readFileSync('g.bnf', 'utf8');

    // The grammar is stored in the string g
    var rules = erratic.parse(g);
    console.log(erratic.generate(rules, 'list'));

This will print out something like `<baz <bar <bar <bar>>> foo foo bar foo>`.

For more information on the BNF grammar syntax, check out the `prettybnf`
[documentation](http://dhconnelly.github.com/prettybnf).  Additionally, there
are some grammar examples in the `examples` folder of the `erratic` source
repository.

Contributing
------------

- fork on [GitHub](https://github.com/dhconnelly/erratic)
- write code in `erratic.js`
- add unit tests to `test_erratic.js`
- make sure all tests and linting pass: `npm test`
- send me a pull request

Author
------

Written by [Daniel Connelly](http://dhconnelly.com) (<dhconnelly@gmail.com>).

License
-------

Released under the Simplified (2-clause) BSD License, described here and in
the `LICENSE` file:

Copyright (c) 2012, Daniel Connelly
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
