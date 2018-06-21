const path = require('path');
const prettier = require('./prettier');

const options = prettier.resolveConfig.sync(__filename);
let error;

process.on('exit', code => {
  if (error && !code) {
    process.exitCode = 1;
  }
});

module.exports = testPath => (source, expected) => {
  const formatted = prettier.format(source, {
    ...options,
    parser: 'babylon',
  });
  if (formatted !== expected) {
    error = true;
    // eslint-disable-next-line no-console
    console.error(`Failed ${path.basename(testPath)}

Source:
${source}
Formatted:
${formatted}
Expected:
${expected}`);
  }
};
