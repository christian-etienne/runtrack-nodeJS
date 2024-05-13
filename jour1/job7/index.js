const fs = require('fs');
const path = require('path');

// Remplacez 'chemin/vers/votre/data.txt' par le chemin d'accès à votre fichier data.txt
const filePath = path.join('C:', 'Users', 'etien', 'Downloads', 'data.txt');

fs.readFile(filePath, 'utf-8', (err, fileContent) => {
  if (err) {
    console.error('Erreur lors de la lecture du fichier :', err);
  } else {
    console.log('Contenu du fichier :', fileContent);
  }
});
