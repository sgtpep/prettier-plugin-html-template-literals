require('../assert')(
  'html`<div class="foo">bar {1+1} {1</div>`',
  `
html\`<div class="foo">bar {1+1} {1</div>\`;
`
);
