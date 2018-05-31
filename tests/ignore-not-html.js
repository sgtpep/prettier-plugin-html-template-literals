const compare = require('../compare')(__filename);

compare('\
html``\n\
', '\
html``;\n\
');

compare('\
html`text <>`\n\
', '\
html`text <>`;\n\
');

compare('\
html`<div`\n\
', '\
html`<div`;\n\
');
