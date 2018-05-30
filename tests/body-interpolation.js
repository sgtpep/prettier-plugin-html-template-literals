require('../assert')(
  '\
html`<div class="foo">${\'bar\'}</div>`;\n\
',
  '\
html``;\n\
'
);
