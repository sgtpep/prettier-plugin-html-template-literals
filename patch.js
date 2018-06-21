const Module = require('module');
const embed = require('./embed');

module.exports = request => {
  const { _compile } = Module.prototype;
  Module.prototype._compile = function(content, path) {
    const patchedContent =
      path === require.resolve(request)
        ? content.replace(
            /\bswitch\s*\(node\.type\)\s*{\n\s*case\s*['"]TemplateLiteral['"]:/,
            `
            $&
            try {
              let result = (${embed})(...arguments);
              if (result !== undefined) {
                return result;
              }
            } catch (error) {
              console.error(error.message);
            }
          `,
          )
        : content;
    return _compile.call(this, patchedContent, path);
  };
  return require(request);
};
