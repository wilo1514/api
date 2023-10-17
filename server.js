const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./network/routes');
const db = require('./db');

var app = express();
db(config.DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'));

routes(app);

const server = app.listen(config.PORT, () => {
    console.log(`La app está lista en http://localhost:${config.PORT}/`);
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('Nuevo cliente conectado');

    socket.on('agregar', function (data) {
        // Realiza alguna lógica y envía una respuesta
        socket.emit('respuesta', { mensaje: 'se agrego una nueva empresa' });
    });
});
