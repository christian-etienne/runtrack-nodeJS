const path = require('path');

// Remplacez 'chemin/vers/votre/fichier.ext' par le chemin d'accès à votre fichier
const filePath = 'C:/Users/etien/Documents/La plateforme/runtrack-nodeJS/jour1/job5/index.js';


// Récupérez le nom du fichier
const fileName = path.basename(filePath);
console.log('Nom du fichier :', fileName);

// Récupérez l'extension du fichier
const fileExt = path.extname(filePath);
console.log('Extension du fichier :', fileExt);

// Récupérez le répertoire parent du fichier
const parentDir = path.dirname(filePath);
console.log('Répertoire parent du fichier :', parentDir);
