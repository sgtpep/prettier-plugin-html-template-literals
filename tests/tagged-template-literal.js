const compare = require('../compare')(__filename);

compare('\
html`<div/ >`\n\
', '\
html`<div />`;\n\
');

compare('\
`<div/ >`\n\
', '\
`<div/ >`;\n\
');

compare('\
foo`<div/ >`\n\
', '\
foo`<div />`;\n\
');

compare('\
foo()`<div/ >`\n\
', '\
foo()`<div />`;\n\
');
