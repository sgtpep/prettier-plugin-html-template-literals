require('../assert')(
  '\
html`< div/>< span/>`;\n\
',
  '\
html`\n\
  <div />\n\
  <span />\n\
`;\n\
'
);
