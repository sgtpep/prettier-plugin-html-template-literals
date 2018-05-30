require('../assert')(
  'html`<span class="bar">qux {1+1} {1</span>`',
  `
html\`<span class="bar">qux {1+1} {1</span>\`;
`
);
