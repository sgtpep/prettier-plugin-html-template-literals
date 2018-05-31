const compare = require('../compare')(__filename);

compare('\
html`<div/ ><span/ >`\n\
', '\
html`\n\
  <div />\n\
  <span />\n\
`;\n\
');
