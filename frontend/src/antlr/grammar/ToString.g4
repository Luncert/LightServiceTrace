grammar ToString;

data
   : map
   | arr
   | obj
   ;

map
   : '{' mapPair (',' mapPair)* '}'
   | '{' '}'
   ;

mapPair
   : value '=' value?
   ;

arr
   : '[' value (',' value)* ']'
   | '[' ']'
   ;

obj
   : identifier '(' (objPair (',' objPair)* )? ')'
   ;

objPair
   : identifier ('=' | ':') value?
   ;

identifier
   : LITERAL_VALUE
   ;

value
   : data
   | LITERAL_VALUE
   ;

LITERAL_VALUE
   : STRING
  //  | LITERAL (LITERAL | TIMEZONE)*
   ;

LITERAL
   : ~ ('(' | ')' | ',' | '[' | ']' | '{' | '}' | '=' | ' ')
   ;

STRING
   : '"' ~('"')* '"'
   | '\'' ~('\'')* '\''
   ;

fragment TIMEZONE
   : '[UTC]'
   ;

WS
   : [ \t\n\r] + -> skip
   ;
