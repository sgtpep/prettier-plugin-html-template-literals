#!/usr/bin/env node
const Module = require('module');

const _compile = Module.prototype._compile;
Module.prototype._compile = function(content, path) {
  const patchedContent = path.endsWith('/prettier/bin-prettier.js')
    ? content.replace(
        /\bswitch\s*\(node\.type\)\s*{\n\s*case\s['"]TemplateLiteral['"]:\n/,
        '$&console.log("TODO")\n'
      )
    : content;
  return _compile.call(this, patchedContent, path);
};

require('prettier/bin-prettier');
