require('../assert')(
  '\
html`<foo/><bar/>`;\n\
',
  '\
html`\n\
  <foo />\n\
  <bar />\n\
`;\n\
'
);
