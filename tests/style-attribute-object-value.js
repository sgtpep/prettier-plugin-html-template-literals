require('../assert')(
  "\
html`<div style=${{ foo: 'foo', bar: 'bar', baz: 'baz', qux: 'qux' }}>foo</div>`;\n\
",
  "\
html`\n\
  <div style=${{ foo: 'foo', bar: 'bar', baz: 'baz', qux: 'qux' }}>\n\
    foo\n\
  </div>\n\
`;\n\
"
);
