// Importation du module 'url'
const url = require('url');

// Déclaration de la constante URL
const URL = "https://www.google.com?search=nodejs";

// Parsing de l'URL
const parsedUrl = url.parse(URL, true);

// Récupération des informations demandées
const protocol = parsedUrl.protocol;
const hostname = parsedUrl.hostname;
const params = parsedUrl.query;

// Modification du nom d'hôte
parsedUrl.hostname = "www.laplateforme.io";

// Ajout d'un paramètre
parsedUrl.query.newParam = "newValue";

// Reformatage de l'URL
const newUrl = url.format(parsedUrl);

// Affichage de la nouvelle URL dans le terminal
console.log(newUrl);
