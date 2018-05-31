const compare = require('../compare')(__filename);

compare('\
html`<div>foo</div> `\n\
', '\
html`<div>foo</div>`;\n\
');

compare('\
html` <div>foo</div>`\n\
', '\
html`<div>foo</div>`;\n\
');

compare('\
html` <div>foo</div> `\n\
', '\
html`<div>foo</div>`;\n\
');

compare('\
html`<div> </div>`\n\
', '\
html`<div> </div>`;\n\
');

compare(
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

compare(
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
