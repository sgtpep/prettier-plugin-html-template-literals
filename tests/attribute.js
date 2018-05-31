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
  "\
html`<div class=${'foo'}>foo</div >`\n\
",
  "\
html`<div class=${'foo'}>foo</div>`;\n\
",
);

compare(
  '\
html`<div class="${\'foo\'}">foo</div >`\n\
',
  '\
html`<div class="${\'foo\'}">foo</div>`;\n\
',
);

compare(
  '\
html`<div class="foo ${\'bar\'}">foo</div >`\n\
',
  '\
html`<div class="foo ${\'bar\'}">foo</div>`;\n\
',
);

compare(
  '\
html`<div id="foo" class="bar" data-foo="foo" data-bar="bar" data-baz="baz" data-qux="qux">foo</div >`\n\
',
  '\
html`\n\
  <div\n\
    id="foo"\n\
    class="bar"\n\
    data-foo="foo"\n\
    data-bar="bar"\n\
    data-baz="baz"\n\
    data-qux="qux"\n\
  >\n\
    foo\n\
  </div>\n\
`;\n\
',
);
