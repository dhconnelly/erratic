<expr>       ::= <add_expr>;
<add_expr>   ::= <mul_expr> " add " <add_expr> | <mul_expr>;
<mul_expr>   ::= <exp_expr> " mul " <mul_expr> | <exp_expr>;
<exp_expr>   ::= <par_expr> " exp " <par_expr> | <par_expr>;
<par_expr>   ::= "|" <add_expr> "|" | <num>;
<num>        ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
