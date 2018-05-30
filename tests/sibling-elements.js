require('../assert')(
  '\
html`<foo></foo><bar></bar>`;\n\
',
  '\
html`\n\
  <foo />\n\
  <bar />\n\
`;\n\
'
);
