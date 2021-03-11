const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost/tcu-webapp';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true},
    
    (err) => {
    if (err)
        console.error(err);
    else
        console.log("BD Conectada!"); 
});

module.exports = mongoose;