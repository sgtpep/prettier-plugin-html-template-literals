const compare = require('../compare')(__filename);

compare(
  '\
html`<div class="foo">foo</div >`\n\
',
  '\
html`<div class="foo">foo</div>`;\n\
',
);

compare(
  '\
html`<div class="foo">${\'foo\'}</div >`\n\
',
  '\
html`<div class="foo">${\'foo\'}</div>`;\n\
',
);

compare(
  '\
html`<div class="foo">bar ${\'baz\'}</div >`\n\
',
  '\
html`<div class="foo">bar ${\'baz\'}</div>`;\n\
',
);
