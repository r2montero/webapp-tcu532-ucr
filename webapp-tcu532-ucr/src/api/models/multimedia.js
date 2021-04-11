const mongoose = require('mongoose');
const { Schema } = mongoose;

const MultimediaSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        enum: ["Audio", "Documento", "Imagen", "Infografía", "Vídeo", "Otro"],
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
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Multimedia', MultimediaSchema);