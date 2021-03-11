const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongo } = require('./db');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewres
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', require('./routes/routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`)
});