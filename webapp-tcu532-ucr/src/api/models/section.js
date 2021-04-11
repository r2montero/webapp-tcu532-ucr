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
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Post'
        }
    ],
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Section', SectionSchema);