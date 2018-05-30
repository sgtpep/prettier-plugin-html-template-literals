# prettier-plugin-html-template-literals

[![Build Status](https://travis-ci.com/sgtpep/prettier-plugin-html-template-literals.svg?branch=master)](https://travis-ci.com/sgtpep/prettier-plugin-html-template-literals)

Formats HTML within tagged template literals in Prettier which is useful for hyperHTML, lit-html and maybe others. For example:

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
