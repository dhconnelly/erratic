<list>  ::=  "<" <items> ">"                ;
<items> ::=  <items> " " <item> | <item>    ;
<item>  ::=  "foo" | "bar" | "baz" | <list> ;
