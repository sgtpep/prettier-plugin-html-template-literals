require('../assert')(
  '\
html`<style>:root{color:red}</style>;\n\
',
  '\
html``;\n\
'
);
