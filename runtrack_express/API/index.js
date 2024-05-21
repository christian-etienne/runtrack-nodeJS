const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connecter à MongoDB
mongoose.connect('mongodb://localhost:27017/LaPlateforme')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Définir le schéma et le modèle pour la collection "student"
const studentSchema = new mongoose.Schema({
    lastname: String,
    firstname: String,
    sudents_number: Number,
    year_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year'
    }
});
const Student = mongoose.model('Student', studentSchema, 'student');

const yearSchema = new mongoose.Schema({
    name: String
});
const Year = mongoose.model('Year', yearSchema, 'year');

// Route pour récupérer tous les étudiants
app.get('/student', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour récupérer un étudiant par ID
app.get('/student/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
