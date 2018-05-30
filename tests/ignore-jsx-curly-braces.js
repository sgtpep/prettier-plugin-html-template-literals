require('../assert')(
  '\
html`<div class="foo">bar {1+1} {1</div>`;\n\
',
  '\
html`<div class="foo">bar {1+1} {1</div>`;\n\
'
);
