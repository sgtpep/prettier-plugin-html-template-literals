module.exports = function embed(path, print, textToDoc) {
  if (path.getParentNode().tag.name === 'html') {
    try {
      const text = node.quasis
        .map(quasis => quasis.value.raw)
        .reduce(
          (text, quasis, index) =>
            `${text}${
              index ? `{'@prettier-placeholder-${index - 1}-id'}` : ''
            }${quasis.replace(/{/g, '@prettier-curly-brace')}`,
          ''
        );
      const expressions = node.expressions
        ? path.map(print, 'expressions')
        : [];
      const doc = textToDoc(`<>${text}</>`, { parser: 'babylon' });
      const processedDoc = mapDoc(doc, doc => {
        if (doc && doc.parts) {
          if (doc.parts[0] === '{' && doc.parts[doc.parts.length - 1] === '}') {
            let match;
            try {
              match = doc.parts[1].contents.parts[1].parts[0].match(
                /@prettier-placeholder-(\d+)/
              );
            } catch (error) {}
            if (match) {
              return concat(['${', expressions[match[1]], '}']);
            }
          } else {
            for (const [index, part] of doc.parts.entries()) {
              if (part.includes) {
                if (part.includes("{'@prettier-placeholder-")) {
                  const parts = [];
                  const regExp = /{'@prettier-placeholder-(\d+)-id'}/g;
                  let match;
                  let offset = 0;
                  while ((match = regExp.exec(part))) {
                    parts.push(
                      part.slice(offset, match.index),
                      '${',
                      expressions[match[1]],
                      '}'
                    );
                    offset = match.index + match[0].length;
                  }
                  parts.push(part.slice(offset));
                  doc.parts.splice(index, 1, ...parts);
                } else if (part.includes('@prettier-curly-brace')) {
                  doc.parts[index] = part.replace(
                    /@prettier-curly-brace/g,
                    '{'
                  );
                }
              }
            }
          }
        }
        return doc;
      });
      function trimDoc(doc) {
        let trimmedDoc = doc;
        while (!trimmedDoc.parts.includes(';')) {
          trimmedDoc = trimmedDoc.parts[0];
        }
        return trimmedDoc.parts[0].parts[0].contents.parts[1].contents.parts[1]
          .contents;
      }
      const trimmedDoc = trimDoc(processedDoc);
      const line = willBreak(trimmedDoc) ? hardline : '';
      return concat(['`', indent(concat([line, trimmedDoc])), line, '`']);
    } catch (error) {
      console.error(error);
    }
  }
};
