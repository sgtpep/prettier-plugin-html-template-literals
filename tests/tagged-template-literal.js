const assert = require('../assert')(__filename);

assert('\
html`<div/ >`\n\
', '\
html`<div />`;\n\
');

assert('\
`<div/ >`\n\
', '\
`<div/ >`;\n\
');

assert('\
foo`<div/ >`\n\
', '\
foo`<div />`;\n\
');

assert('\
foo()`<div/ >`\n\
', '\
foo()`<div />`;\n\
');
