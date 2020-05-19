//Debe llamarse antes de levantar el servidor
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/index'));

//Static content
//Con esto le decimos a express que carpeta queremos que sea pública, debemos darle el full path
//Para esto usamos path de express, que hace el trabajo por nosotros
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);
console.log("Server listening...");