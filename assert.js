const path = require('path');
const prettier = require('./prettier');

const options = prettier.resolveConfig.sync(__filename);

module.exports = function(source, expected) {
  const formatted = prettier.format(source, { ...options, parser: 'babylon' });
  if (formatted !== expected) {
    console.error(`Failed ${path.basename(module.parent.filename)}

Source:
${source}
Formatted:
${formatted}
Expected:
${expected}`);
  }
};
