const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
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
        required: true
    },
    tags: [
        {
            type: String,
            trim: true,
            lowercase: true
        }
    ],
    
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
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);