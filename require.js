const Module = require('module');
const embed = require('./embed');

module.exports = function(request) {
  const { _compile } = Module.prototype;
  Module.prototype._compile = function(content, path) {
    const patchedContent =
      path === require.resolve(request)
        ? content.replace(
            /\bswitch\s*\(node\.type\)\s*{\n\s*case\s['"]TemplateLiteral['"]:/,
            `
            $&
            let result = (${embed})(...arguments);
            if (result !== undefined) {
              return result;
            }
          `
          )
        : content;
    return _compile.call(this, patchedContent, path);
  };
  return require(request);
};
