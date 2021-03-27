const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost/tcu-tempdb';

mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(db => console.log('MongoDB Connected!'))
    .catch(err => console.error(err));

module.exports = mongoose;