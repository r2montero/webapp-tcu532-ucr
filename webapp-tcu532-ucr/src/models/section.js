const mongoose = require('mongoose');
const { Schema } = mongoose;

const SectionSchema = new Schema({
    name: {
        type: String, 
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
    timestamps: true
});

module.exports = mongoose.model('Section', SectionSchema);