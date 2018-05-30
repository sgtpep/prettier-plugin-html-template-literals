#!/usr/bin/env node
const assert = require('assert').strict;
const fs = require('fs');
const package = require('./package');
const path = require('path');
const { spawnSync } = require('child_process');

const cliPath = path.join(__dirname, 'test');

function main() {
  setupCLI();
  testCLI();
  testAPI();
}

function setupCLI() {
  spawnSync('mkdir', ['-p', cliPath], { stdio: 'inherit' });
  fs.writeFileSync(
    path.join(cliPath, 'package.json'),
    JSON.stringify({
      dependencies: {
        prettier: '*',
        'prettier-plugin-html-template-literals':
          'sgtpep/prettier-plugin-html-template-literals',
      },
    })
  );
  spawnSync('yarn', ['--cwd', cliPath, 'install'], { stdio: 'inherit' });
}

function testAPI() {
  require(path.join(__dirname, 'tests'));
}

function testCLI() {
  const { stdout, stderr } = spawnSync(
    path.join(cliPath, 'node_modules/.bin/prettier'),
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
