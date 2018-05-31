# prettier-plugin-html-template-literals

[![Build Status](https://travis-ci.com/sgtpep/prettier-plugin-html-template-literals.svg?branch=master)](https://travis-ci.com/sgtpep/prettier-plugin-html-template-literals)

Formats HTML within tagged template literals in [Prettier](https://prettier.io/) which is useful for [hyperHTML](https://viperhtml.js.org/), [lit-html](https://polymer.github.io/lit-html/) and maybe others. For example:

Input:

```javascript
html`<div id="foo" class="foo bar baz" data-foo="foo" data-bar="bar" data-baz="baz"><span>Foobar</span></div>`;
```

Output:

```javascript
html`
  <div
    id="foo"
    class="foo bar baz"
    data-foo="foo"
    data-bar="bar"
    data-baz="baz"
  >
    <span>Foobar</span>
  </div>
`;
```

## Usage

Install `prettier` and `prettier-plugin-html-template-literals` using `yarn`:

```shell
yarn add prettier prettier-plugin-html-template-literals
```

Or using `npm`:

```shell
npm install prettier prettier-plugin-html-template-literals
```

### Usage from CLI

`prettier-plugin-html-template-literals` replaces the `prettier` executable with its wrapped version. The original `prettier` executable will be restored if you delete this plugin. Use it as the regular `prettier` executable:

```shell
echo 'html`<div><span>foo</span></div>`' | ./node_modules/.bin/prettier --stdin-filepath=test.js
```

### Usage from API

Unfortunately this plugin is actually ignored by the `prettier` API at the moment. Instead of `require('prettier').format()` you need to use the wrapper module with the same API:

```javascript
require('prettier-plugin-html-template-literals/prettier').format(
  'html`<div><span>foo</span></div>`',
  { parser: 'babylon' }
);
```
