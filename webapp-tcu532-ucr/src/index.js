const express = require('express');
require('dotenv').config();
const connectDB = require('../config/db');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors')

//Express server
const app = express();

//To see Running process
//console.log(process.env);

//Connect Database
connectDB();

//CORS
app.use(cors());

//Middlewres
app.use(morgan('dev'));
app.use(express.json());

//Static files / Public
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api/usuarios', require('./routes/user_routes'));
app.use('/api/multimedia', require('./routes/multimedia_routes'));
app.use('/api/secciones', require('./routes/section_routes'));
app.use('/api/posts', require('./routes/post_routes'));

//Server
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`)
});