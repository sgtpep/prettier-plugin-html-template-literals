require('../assert')(
  '\
html`<div class="foo">foo {1+1} {1</div >`\n\
',
  '\
html`<div class="foo">foo {1+1} {1</div>`;\n\
'
);
