const assert = require('../assert')(__filename);

assert('\
html``\n\
', '\
html``;\n\
');

assert('\
html`text <>`\n\
', '\
html`text <>`;\n\
');

assert('\
html`<div`\n\
', '\
html`<div`;\n\
');
