const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Importa el paquete cors
const app = express();
const port = 3000;
app.use(cors()); // Habilita CORS para todas las rutas
// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());
// Conectar a la base de datos SQLite (archivo local)
const db = new sqlite3.Database('users.db');
// Crear tabla de usuarios en la base de datos si no existe
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
});
// Ruta para obtener la lista de usuarios
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
});

// Ruta para agregar un nuevo usuario
app.post('/users', (req, res) => {
    const newUser = req.body;
    db.run('INSERT INTO users (name) VALUES (?)', [newUser.name], function (err) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            newUser.id = this.lastID;
            res.status(201).json(newUser);
        }
    });
});
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    db.run('UPDATE users SET name = ? WHERE id = ?', [updatedUser.name, userId], (err) =>
    {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(updatedUser);
        }
    });
});
// Eliminar un usuario por ID
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.run('DELETE FROM users WHERE id = ?', [userId], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(204).send(); // Sin contenido (no hay datos para devolver)
        }
    });
});
// Ruta predeterminada para manejar rutas no definidas
app.use((req, res) => {
    res.status(404).send('Not Found');
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});