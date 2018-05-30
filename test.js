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
        'html`<div id="foo" class="foo bar baz" data-foo="foo" data-bar="bar" data-baz="baz"><span>Foobar</span></div>`',
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
    class="foo bar baz"
    data-foo="foo"
    data-bar="bar"
    data-baz="baz"
  >
    <span>Foobar</span>
  </div>
\`;
`.trimStart()
  );
}

main();

//const template = html`<span class="bar">qux {1+1} {1</span>`;
//const template = html`<foo></foo><bar></bar>`;
//const template = html`<div data-foo="bar">${items.map(item => html`<span class="foo bar baz test foo foo foo" foo="qux">${item.id}</span>`)}</div>`;
//const template = html`<span class="foo" hidden>${item.id}</span>`;
//const template = html`<span class="bar ${'foo'+'bar'}" data-foo=${'bar'} style=${{width: 100}}>${'abc' + 'bar' + 'baz' +'foo' + 'bar' + 'baz' + 'foo' + 'bar' + 'baz' + 'foo' + 'bar' + 'baz'}</span>`;
//function foo() {
//  function foo() {
//    function foo() {
//      function foo() {
//        function foo() {
//          const template = html`<span class="bar">qux</span>`;
//          const template = html`<span class="bar">${'qux'}</span>`;
//          const template = html`<div class="foo" data-id="foo" hidden=${false}><span class="bar" data-id="bar" style=${{width: 100, foo: 'bar', baz: 'qux', foo: 'bar', baz: 'qux'}}>${'test'}</span></div>`;
//          const template = html`<span class="foo bar baz test foo foo foo" foo="qux">${item.id}</span>`
//          const template = html`<div data-foo="bar">${items.map(item => html`<span class="foo bar baz test foo foo foo" foo="qux">${item.id}</span>`)}</div>`;
//        }
//      }
//    }
//  }
//}
//
//const template = html`<style>:root{color:red}</style>`;
//const template = html`<style>:root{color:${'red'}}</style>`;
