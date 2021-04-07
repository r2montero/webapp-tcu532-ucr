const express = require('express');
const connectDB = require('../config/db');
const morgan = require('morgan');
const path = require('path');

const app = express();

//Codigo temporal, no borrar el codigo comentado
//const { mongooose } = require('./database');
//Fin codigo temporal

// Connect Database
connectDB();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewres
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/categories', require('./api/categories'));
app.use('/api/users', require('./routes/user_routes'));
app.use('/api/multimedia', require('./routes/multimedia_routes'))

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});
