const fs = require('fs');
const path = require('path');

// Remplacez 'chemin/vers/votre/data.txt' par le chemin d'accès à votre fichier data.txt
const filePath = path.join('C:', 'Users', 'etien', 'Downloads', 'data.txt');

try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log('Contenu du fichier :', fileContent);
} catch (err) {
  console.error('Erreur lors de la lecture du fichier :', err);
}
