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
