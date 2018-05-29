const Module = require('module');
const embed = require('./embed');

module.exports = function prettier(name = 'index') {
  const requirePath = `prettier/${name}`;
  const modulePath = require.resolve(requirePath);
  const { _compile } = Module.prototype;
  Module.prototype._compile = function(content, path) {
    const patchedContent =
      path === modulePath
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
  return require(requirePath);
};
