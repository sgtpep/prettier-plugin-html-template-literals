require('../assert')(
  "\
html`<div style=${{ foo: 'foo', bar: 'bar', baz: 'baz', qux: 'qux' }}>foo</div>`;\n\
",
  '\
html``;\n\
'
);
