const compare = require('../compare')(__filename);

compare(
  "\
html`<div style=${{ foo: 'bar' }}>foo</div >`\n\
",
  "\
html`<div style=${{ foo: 'bar' }}>foo</div>`;\n\
",
);

compare(
  "\
html`<div style=${{ foo: 'foo', bar: 'bar', baz: 'baz', qux: 'qux' }}>foo</div >`\n\
",
  "\
html`\n\
  <div style=${{ foo: 'foo', bar: 'bar', baz: 'baz', qux: 'qux' }}>\n\
    foo\n\
  </div>\n\
`;\n\
",
);

compare(
  "\
html`<div style=${{ foo: 'foo', bar: 'bar', baz: 'baz', qux: 'qux', foo: 'foo', bar: 'bar' }}>foo</div >`\n\
",
  "\
html`\n\
  <div\n\
    style=${{\n\
      foo: 'foo',\n\
      bar: 'bar',\n\
      baz: 'baz',\n\
      qux: 'qux',\n\
      foo: 'foo',\n\
      bar: 'bar',\n\
    }}\n\
  >\n\
    foo\n\
  </div>\n\
`;\n\
",
);
