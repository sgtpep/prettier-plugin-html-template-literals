const { equal } = require('assert').strict;
const { format } = require('./prettier');

module.exports = function assert(actual, expected) {
  return equal(format(actual, { parser: 'babylon' }), expected);
};
