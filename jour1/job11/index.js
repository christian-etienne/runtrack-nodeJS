// Importation du module 'http'
const http = require('http');

// Création du serveur
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Hello World !\n');
});

// Démarrage du serveur sur le port 8888
server.listen(8888, () => {
    console.log('Server running at http://localhost:8888/');
});
