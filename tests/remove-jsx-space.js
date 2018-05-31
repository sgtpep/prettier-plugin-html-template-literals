const assert = require('../assert')(__filename);

assert('\
html`<div>foo</div> `\n\
', '\
html`<div>foo</div>`;\n\
');

assert('\
html` <div>foo</div>`\n\
', '\
html`<div>foo</div>`;\n\
');

assert('\
html` <div>foo</div> `\n\
', '\
html`<div>foo</div>`;\n\
');

assert('\
html`<div> </div>`\n\
', '\
html`<div> </div>`;\n\
');

assert(
  '\
html`<div data-foo="foo" data-bar="bar"> </div>`\n\
',
  '\
html`\n\
  <div data-foo="foo" data-bar="bar">\n\
  </div>\n\
`;\n\
',
);

assert(
  '\
html`<div><span data-foo="foo" data-bar="bar"/ > <span data-foo="foo" data-bar="bar"/ ></div>`\n\
',
  '\
html`\n\
  <div>\n\
    <span data-foo="foo" data-bar="bar" />\n\
    <span data-foo="foo" data-bar="bar" />\n\
  </div>\n\
`;\n\
',
);
