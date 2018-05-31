const assert = require('../assert')(__filename);

assert('\
html`<div/ ><span/ >`\n\
', '\
html`\n\
  <div />\n\
  <span />\n\
`;\n\
');
