#!/usr/bin/env node
const Module = require('module');
const embed = require('./embed');

const { _compile } = Module.prototype;
Module.prototype._compile = function(content, path) {
  const patchedContent = path.endsWith('/node_modules/prettier/bin-prettier.js')
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
require('prettier/bin-prettier');
