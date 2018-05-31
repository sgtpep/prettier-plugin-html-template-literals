require('../assert')('\
html`<div>foo</div> `;\n\
', '\
html`<div>foo</div>`;\n\
');

require('../assert')('\
html` <div>foo</div>`;\n\
', '\
html`<div>foo</div>`;\n\
');

require('../assert')(
  '\
html` <div>foo</div> `;\n\
',
  '\
html`<div>foo</div>`;\n\
'
);

require('../assert')('\
html`<div> </div>`;\n\
', '\
html`<div> </div>`;\n\
');

require('../assert')(
  '\
html`<div data-foo="foo" data-bar="bar"> </div>`;\n\
',
  '\
html`\n\
  <div data-foo="foo" data-bar="bar">\n\
  </div>\n\
`;\n\
'
);

require('../assert')(
  '\
html`<div><span data-foo="foo" data-bar="bar"/ > <span data-foo="foo" data-bar="bar"/ ></div>`;\n\
',
  '\
html`\n\
  <div>\n\
    <span data-foo="foo" data-bar="bar" />\n\
    <span data-foo="foo" data-bar="bar" />\n\
  </div>\n\
`;\n\
'
);
