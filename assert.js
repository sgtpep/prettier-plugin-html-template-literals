const assert = require('assert').strict;
const prettier = require('./prettier');

const options = prettier.resolveConfig.sync(__filename);

module.exports = function(actual, expected) {
  return assert.equal(
    prettier.format(actual, { ...options, parser: 'babylon' }),
    expected
  );
};
