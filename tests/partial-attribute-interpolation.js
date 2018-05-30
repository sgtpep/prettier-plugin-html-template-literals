require('../assert')(
  '\
html`<div class="foo ${\'bar\'}">baz</div>`;\n\
',
  '\
html``;\n\
'
);
