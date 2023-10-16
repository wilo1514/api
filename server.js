/*const express = require('express')
const body_parser = require('body-parser')

const config = require('./config')
const routes = require('./network/routes')
const db = require('./db')

var app = express()
db( config.DB_URL )

app.use( body_parser.json() )
app.use( body_parser.urlencoded({extended: false}) )
app.use('/',express.static('public'))

routes( app )

app.listen( config.PORT )
console.log(`ve la app en http://localhost:${config.PORT}/`)*/
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

// Mueve las rutas antes de escuchar por conexiones WebSocket
routes(app);

// Cambia esta línea para crear un servidor HTTP independiente
const server = app.listen(config.PORT, () => {
    console.log(`La app está lista en http://localhost:${config.PORT}/`);
});

const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('Nuevo cliente conectado');
    socket.emit('mensaje', 'Se agrego una empresa');

    // Maneja más eventos de WebSocket aquí.
});
