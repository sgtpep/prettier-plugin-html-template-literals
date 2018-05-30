const fs = require('fs');
const path = require('path');

for (const filename of fs.readdirSync(__dirname)) {
  if (filename !== path.basename(__filename)) {
    require(`./${filename}`);
  }
}
