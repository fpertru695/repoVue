const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const port = 3000;
app.use(cors()); // Habilita CORS para todas las rutas
app.use(bodyParser.json());
// Datos de ejemplo (en memoria)
let users = [
    {id: 1, name: 'Usuario 1'},
    {id: 2, name: 'Usuario 2'},
// Puedes agregar más usuarios según sea necesario
];
// Ruta para obtener la lista de usuarios
app.get('/users', (req, res) => {
    res.json(users);
});
// Ruta para agregar un nuevo usuario
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.status(201).json(newUser);
});
// Ruta predeterminada para manejar rutas no definidas
app.use((req, res) => {
    res.status(404).send('Not Found');
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
