require('../assert')('\
html``\n\
', '\
html``;\n\
');

require('../assert')('\
html`text <>`\n\
', '\
html`text <>`;\n\
');

require('../assert')('\
html`<div`\n\
', '\
html`<div`;\n\
');
