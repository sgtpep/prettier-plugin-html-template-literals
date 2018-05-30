require('../assert')(
  '\
html`<div id="foo" class="bar" data-foo="foo" data-bar="bar" data-baz="baz" data-qux="qux">foo</div>`;\n\
',
  '\
html``;\n\
'
);
