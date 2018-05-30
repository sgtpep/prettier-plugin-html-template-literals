#!/usr/bin/env node
const assert = require('assert').strict;
const fs = require('fs');
const package = require('./package');
const path = require('path');
const { spawnSync } = require('child_process');

const environmentPath = path.join(__dirname, 'test');

function main() {
  setupCLI();
  testCLI();
  testAPI();
}

function setupCLI() {
  spawnSync('mkdir', ['-p', environmentPath], { stdio: 'inherit' });
  spawnSync('yarn', ['--cwd', environmentPath, 'install'], {
    stdio: 'inherit',
  });
  spawnSync(
    'yarn',
    [
      '--cwd',
      environmentPath,
      'add',
      'prettier',
      'sgtpep/prettier-plugin-html-template-literals',
    ],
    {
      stdio: 'inherit',
    }
  );
  fs.writeFileSync(
    path.join(environmentPath, '.prettierrc'),
    JSON.stringify({})
  );
}

function testAPI() {
  require(path.join(environmentPath, 'node_modules', package.name, 'tests'));
}

function testCLI() {
  const { stdout, stderr } = spawnSync(
    path.join(environmentPath, 'node_modules/.bin/prettier'),
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
    `
html\`
  <div
    id="foo"
    class="bar"
    data-foo="foo"
    data-bar="bar"
    data-baz="baz"
    data-qux="qux"
  >
    foo
  </div>
\`;
`.trimStart()
  );
}

main();
