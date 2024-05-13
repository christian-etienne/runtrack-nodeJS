const fs = require('fs');
const path = require('path');

// Remplacez 'chemin/vers/votre/data.txt' par le chemin d'accès à votre fichier data.txt
const filePath = path.join('C:', 'Users', 'etien', 'Downloads', 'data.txt');

const newContent = 'Je manipule les fichiers avec un module node !';

fs.writeFile(filePath, newContent, (err) => {
  if (err) {
    console.error('Erreur lors de l\'écriture dans le fichier :', err);
  } else {
    console.log('Le contenu du fichier a été mis à jour avec succès.');
  }
});
