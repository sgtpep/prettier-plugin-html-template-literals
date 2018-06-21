module.exports = (path, print, textToDoc) => {
  /* global concat:false, indent:false, mapDoc:false, node:false, parent:false, softline:false, willBreak:false */
  if (parent.type === 'TaggedTemplateExpression') {
    const text = node.quasis
      .map(quasis => quasis.value.raw)
      .reduce(
        (text, quasis, index) =>
          `${text}${
            index ? `{'@prettier-placeholder-${index - 1}-id'}` : ''
          }${quasis.replace(/{/g, '@prettier-curly-brace')}`,
        '',
      )
      .trim();
    if (/<\s*\/[^<]+?>|<[^<]+?\/\s*>/.test(text)) {
      // eslint-disable-next-line no-console, no-unused-vars
      const log = value => console.log(JSON.stringify(value, null, 2));
      const expressions = node.expressions
        ? path.map(print, 'expressions')
        : [];
      const processDoc = doc => {
        if (doc) {
          if (
            doc.contents &&
            doc.contents.parts &&
            doc.contents.parts[1] &&
            doc.contents.parts[1].parts &&
            !doc.contents.parts[1].parts.filter(Boolean).length
          ) {
            doc.contents = '';
          }
          if (doc.expandedStates) {
            doc.expandedStates = doc.expandedStates.map(doc =>
              mapDoc(doc, doc => processDoc(doc)),
            );
          }
          if (doc.parts) {
            if (
              doc.parts[0] === '{' &&
              doc.parts[doc.parts.length - 1] === '}' &&
              doc.parts[1] &&
              doc.parts[1].contents &&
              doc.parts[1].contents.parts &&
              doc.parts[1].contents.parts[1] &&
              doc.parts[1].contents.parts[1].parts &&
              doc.parts[1].contents.parts[1].parts[0]
            ) {
              const match = doc.parts[1].contents.parts[1].parts[0].match(
                /^['"]@prettier-placeholder-(\d+)-id['"]$/,
              );
              if (match) {
                return concat(['${', expressions[match[1]], '}']);
              }
            }
            for (const [index, part] of doc.parts.entries()) {
              if (part === '{" "}' || part === "{' '}") {
                doc.parts[index] = '';
              }
              if (part.includes) {
                if (part.includes('@prettier-placeholder-')) {
                  const parts = [];
                  const regExp = /{['"]@prettier-placeholder-(\d+)-id['"]}/g;
                  let match;
                  let offset = 0;
                  while ((match = regExp.exec(part))) {
                    parts.push(
                      part.slice(offset, match.index),
                      '${',
                      expressions[match[1]],
                      '}',
                    );
                    offset = match.index + match[0].length;
                  }
                  parts.push(part.slice(offset));
                  doc.parts.splice(index, 1, ...parts);
                }
                if (part.includes('@prettier-curly-brace')) {
                  doc.parts[index] = part.replace(
                    /@prettier-curly-brace/g,
                    '{',
                  );
                }
              }
            }
          }
        }
        return doc;
      };
      const trimDoc = doc => {
        let trimmedDoc = doc;
        while (!trimmedDoc.parts.includes(';')) {
          trimmedDoc = trimmedDoc.parts[0];
        }
        return trimmedDoc.parts[0].parts[0].contents.parts[1].contents.parts[1]
          .contents;
      };
      const indentDoc = doc => {
        if (
          doc.parts &&
          doc.parts[0] &&
          doc.parts[0].parts &&
          doc.parts[0].parts[0] &&
          doc.parts[0].parts[0].expandedStates
        ) {
          const breakableDoc = doc.parts[0].parts[0].expandedStates.find(
            doc => doc.break,
          );
          if (breakableDoc) {
            breakableDoc.contents = concat([
              indent(concat([softline, breakableDoc.contents])),
              softline,
            ]);
            return doc;
          }
        }
        return willBreak(doc)
          ? concat([indent(concat([softline, doc])), softline])
          : doc;
      };
      const doc = textToDoc(`<>${text}</>`, { parser: 'babylon' });
      const processedDoc = indentDoc(
        trimDoc(mapDoc(doc, doc => processDoc(doc))),
      );
      return concat(['`', processedDoc, '`']);
    }
  }
};
