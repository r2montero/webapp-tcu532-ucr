const mongoose = require('mongoose');
const { Schema } = mongoose;

const MultimediaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Audio", "Documento", "Imágen", "Infografía", "Vídeo", "Otro"],
        required: true
    },
    storage_link: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    section: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Multimedia', MultimediaSchema);