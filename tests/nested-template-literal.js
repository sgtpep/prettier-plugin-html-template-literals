require('../assert')(
  '\
html`<div>${items.map(item => html`<span/ >`)}</div >`\n\
',
  '\
html`<div>${items.map(item => html`<span />`)}</div>`;\n\
'
);

require('../assert')(
  '\
html`<div data-foo="foo" data-bar="bar" data-baz="baz">${items.map(item => html`<span/ >`)}</div >`\n\
',
  '\
html`\n\
  <div data-foo="foo" data-bar="bar" data-baz="baz">\n\
    ${items.map(item => html`<span />`)}\n\
  </div>\n\
`;\n\
'
);

require('../assert')(
  '\
html`<div>${items.map(item => html`<span data-foo="foo" data-bar="bar" data-baz="baz"/ >`)}</div >`\n\
',
  '\
html`\n\
  <div>\n\
    ${items.map(\n\
      item => html`<span data-foo="foo" data-bar="bar" data-baz="baz" />`\n\
    )}\n\
  </div>\n\
`;\n\
'
);
