const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    title: {
        type: String, 
        required: true
    },
    subtitle: {
        type: String
    },
    text: {
        type: String, 
        required: true
    },
    multimedia: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Multimedia'
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    published_date: {
        type: Date,
        required: true
    },
    updated_date: {
        type: Date,
        default: Date.now,
    },
    displayed: {
        type: Boolean, 
        default: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);