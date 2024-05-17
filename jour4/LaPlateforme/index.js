const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017"; // Adresse du serveur MongoDB
const client = new MongoClient(url);

async function getCollections() {
  try {
    await client.connect();
    console.log("Connecté à MongoDB !");

    const db = client.db('LaPlateforme');

    // Récupération des noms des collections
    const collections = await db.collections();
    const collectionNames = collections.map(collection => collection.collectionName);
    console.log("Collections de la base de données 'LaPlateforme' :", collectionNames);

  } finally {
    await client.close();
    console.log("Connexion à MongoDB fermée");
  }
}



async function getStudents() {
  try {
    await client.connect();
    console.log("Connecté à MongoDB !");

    const db = client.db('LaPlateforme');

    // Récupération des documents de la collection 'student'
    const students = await db.collection('student').find().toArray();
    console.log("Documents de la collection 'student' :", students);

  } finally {
    await client.close();
    console.log("Connexion à MongoDB fermée");
  }
}

getStudents().catch(console.error);


getCollections().catch(console.error);
