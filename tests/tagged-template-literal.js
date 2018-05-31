require('../assert')('\
html`<div/ >`;\n\
', '\
html`<div />`;\n\
');

require('../assert')('\
`<div/ >`;\n\
', '\
`<div/ >`;\n\
');

require('../assert')('\
foo`<div/ >`;\n\
', '\
foo`<div />`;\n\
');

require('../assert')('\
foo()`<div/ >`;\n\
', '\
foo()`<div />`;\n\
');
