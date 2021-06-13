const mongoose = require('mongoose');
const { Schema } = mongoose;

const SectionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    description: {
        type: String,
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

module.exports = mongoose.model('Section', SectionSchema);