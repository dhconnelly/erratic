<empty> ::= "";

<space> ::= " " | "\n" | "\t";
<letter> ::= "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j"
           | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t"
           | "u" | "v" | "w" | "x" | "y" | "z"
           | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J"
           | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T"
           | "U" | "V" | "W" | "X" | "Y" | "Z";
<digit> ::= "0" | "1" | "2" | "3" | "4"
          | "5" | "6" | "7" | "8" | "9";
<delim> ::= "-" | "_" | "|" | ":" | "=" | ";" | " ";
<escaped> ::= "\\\"" | "\\n" | "\\t" | "\\\\";
<char> ::= <letter> | <digit> | <delim> | <escaped>;
<terminal_char> ::= <char> | "<" | ">";

<ws> ::= <space> <ws> | <empty>;
<text> ::= <char> <text> | <empty>;
<terminal_text> ::= <terminal_char> <terminal_text> | <empty>;
<term> ::= <terminal> | <nonterminal>;
<terminal> ::= "\"" <terminal_text> "\"";
<nonterminal> ::= "<" <text> ">";
<expression> ::= <term> <ws> <expression> | <term> <ws>;
<expressions> ::= <expression> "|" <ws> <expressions> | <expression>;
<production> ::= <nonterminal> <ws> "::=" <ws> <expressions> ";";
<grammar> ::= <production> <ws> <grammar> | <production> <ws>;
