const assert = require('../assert')(__filename);

assert(
  '\
html`<div class="foo">foo</div >`\n\
',
  '\
html`<div class="foo">foo</div>`;\n\
',
);

assert(
  '\
html`<div class="foo">${\'foo\'}</div >`\n\
',
  '\
html`<div class="foo">${\'foo\'}</div>`;\n\
',
);

assert(
  '\
html`<div class="foo">bar ${\'baz\'}</div >`\n\
',
  '\
html`<div class="foo">bar ${\'baz\'}</div>`;\n\
',
);
