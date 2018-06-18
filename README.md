# prettier-plugin-html-template-literals

[![Build Status](https://travis-ci.com/sgtpep/prettier-plugin-html-template-literals.svg?branch=master)](https://travis-ci.com/sgtpep/prettier-plugin-html-template-literals)

Formats HTML within [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) in [Prettier](https://prettier.io/) which is useful for [hyperHTML](https://viperhtml.js.org/), [lit-html](https://polymer.github.io/lit-html/), [choo](https://choo.io/), [hyperx](https://github.com/choojs/hyperx), [nanohtml](https://github.com/choojs/nanohtml), [snabby](https://github.com/jamen/snabby), [yo-yo](https://github.com/maxogden/yo-yo), and others. For example:

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

## Why

Declaring HTML templates using [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) is a nice alternative to [JSX](https://reactjs.org/docs/introducing-jsx.html). It relies only on standard ES6+ and doesn't require a transpiling/preprocessing toolset, at least during development. [hyperHTML](https://viperhtml.js.org/) and [lit-html](https://polymer.github.io/lit-html/) are nice lightweight libraries built on this idea and, more than that, provide the [React](https://reactjs.org/)-like experience without the bloat of Virtual DOM. There are also Virtual DOM-based libraries that consume HTML from tagged template literals: [choo](https://choo.io/), [hyperx](https://github.com/choojs/hyperx), [nanohtml](https://github.com/choojs/nanohtml), [snabby](https://github.com/jamen/snabby), [yo-yo](https://github.com/maxogden/yo-yo), and others.

## Warning

As HTML tagged template literals get more attention, no doubts Prettier will support them. You can track an [open issue](https://github.com/prettier/prettier/issues/3548) for this request. The problem is that the HTML parser within Prettier is not stable yet, and they haven't decided which tags should identify HTML templates. Also, at the moment, there is no API in Prettier to provide additional embedded languages from plugins. There is [a feature request](https://github.com/prettier/prettier/issues/4424) for this. This plugin provides a temporary 'hacky' solution until it will be implemented within Prettier. It uses Prettier's JSX parser and formats any tagged template literal (but not regular template literal) if it contains `</...>` or `<.../>`. It uses some dirty tricks under the hood, so be warned and report issues/PR.

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

Unfortunately, this plugin is actually ignored by the API exposed with the `prettier` module at the moment. Instead of `require('prettier').format()` you need to use the wrapper module with the same API:

```javascript
require('prettier-plugin-html-template-literals/prettier').format(
  'html`<div><span>foo</span></div>`',
  { parser: 'babylon' },
);
```

## Limitations

Because of this plugin relies on the JSX parser it has some limitations. Some of them may be addressed in future if it will be possible to find a workaround.

- Attribute values without quotes are not supported. Raises an exception: `<div id=foo>`
- Contents of `<style>` elements is ignored and not prettified. Style is not formatted: `<style>.foo{color:red}</style>`
- It's impossible to reliably eliminate whitespace between adjacent elements: May be wrapped on not to multiple lines: `<span></span><span></span>`
- All empty elements are converted to self-closing (void) ones: `<div />`
- Whitespace is not preserved within elements sensitive to it like `pre` or `textarea`. Contents will be collapsed to a single space: `<pre>\n</pre>`
