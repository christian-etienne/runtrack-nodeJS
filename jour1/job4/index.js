const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, '..'), (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  let folderNames = '';
  files.forEach(file => {
    if (fs.statSync(path.join(__dirname, '..', file)).isDirectory()) {
      folderNames += ` ${file}`;
    }
  });

  console.log(`contenu du répertoire courant:${folderNames}`);
});
