require('../assert')(
  '\
html`<div class="foo">foo</div >`\n\
',
  '\
html`<div class="foo">foo</div>`;\n\
',
);

require('../assert')(
  '\
html`<div class="foo">${\'foo\'}</div >`\n\
',
  '\
html`<div class="foo">${\'foo\'}</div>`;\n\
',
);

require('../assert')(
  '\
html`<div class="foo">bar ${\'baz\'}</div >`\n\
',
  '\
html`<div class="foo">bar ${\'baz\'}</div>`;\n\
',
);
