const express = require ('express');
const path = require ('path');
const methodOverride = require ('method-override');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

let personajesRoutes = require("./routes/api/personajesRoutes")
let usuariosRoutes = require("./routes/api/usuariosRoutes")
let peliculasRoutes = require("./routes/api/peliculasRoutes")
let keys = require('./settings/keys')

app.set('key', keys.key);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))



app.use('/characters', personajesRoutes)
app.use('/movies', peliculasRoutes)
app.use('/auth', usuariosRoutes)
// ejecuto el llamado a mis rutas

// middlewars

// llamo a la ruta de la api


app.use(express.static(path.resolve(__dirname, '../public')));

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

//Activando el servidor desde express
app.listen('3009', () => console.log('Servidor corriendo en el puerto 3009'));
