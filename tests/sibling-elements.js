require('../assert')(
  'html`<foo></foo><bar></bar>`',
  `
html\`
  <foo />
  <bar />
\`;
`
);
