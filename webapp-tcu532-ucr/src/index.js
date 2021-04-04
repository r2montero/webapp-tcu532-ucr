const express = require('express');
//const connectDB = require('../config/db'); no borrar
const morgan = require('morgan');
const path = require('path');

const app = express();

//Codigo temporal, no borrar el codigo comentado
const { mongooose } = require('./database');
//Fin codigo temporal

/* Codigo oficial
// Connect Database
connectDB();
*/ //Fin codigo oficial
//Settings
app.set('port', process.env.PORT || 3000);

//Middlewres
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/categories', require('./routes/api/categories'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});
