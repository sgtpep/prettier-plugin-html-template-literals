require('../assert')(
  '\
html`<div>${items.map(item => html`<span/>`)}</div>`;\n\
',
  '\
html`<div>${items.map(item => html`<span />`)}</div>`;\n\
'
);
