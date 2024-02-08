const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mysql'
});
db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});
// Rutas para CRUD
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(result);
        }
    });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    db.query('INSERT INTO users (name) VALUES (?)', [newUser.name], (err, result) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            res.status(500).send('Internal Server Error');
        } else {
            newUser.id = result.insertId;
            res.status(201).json(newUser);
        }
    });
});
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    db.query('UPDATE users SET name = ? WHERE id = ?', [updatedUser.name, userId], err => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(updatedUser);
        }
    });
});
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], err => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(204).send();
        }
    });
});
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});