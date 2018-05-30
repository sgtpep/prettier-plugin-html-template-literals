#!/usr/bin/env node
const assert = require('assert').strict;
const path = require('path');
const { spawnSync } = require('child_process');

function main() {
  testCLI();
  testAPI();
}

function testAPI() {
  require('./tests');
}

function testCLI() {
  const { stdout, stderr } = spawnSync(
    path.join(__dirname, 'cli.js'),
    ['--stdin-filepath', 'test.js'],
    {
      encoding: 'utf8',
      input:
        'html`<div id="foo" class="bar" data-foo="foo" data-bar="bar" data-baz="baz" data-qux="qux">foo</div>`',
    }
  );
  if (stderr) {
    console.error(stderr);
  }
  assert.equal(
    stdout,
    '\
html`\n\
  <div\n\
    id="foo"\n\
    class="bar"\n\
    data-foo="foo"\n\
    data-bar="bar"\n\
    data-baz="baz"\n\
    data-qux="qux"\n\
  >\n\
    foo\n\
  </div>\n\
`;\n\
'
  );
}

main();
