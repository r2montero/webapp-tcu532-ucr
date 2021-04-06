const mongoose = require('mongoose');
const { Schema } = mongoose;

const MultimediaSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String, 
        required: true
    },
    storage_link: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Multimedia', MultimediaSchema);