const mongoose = require('mongoose');
const { Schema } = mongoose;
// When the database design was complete:
//https://youtu.be/DqpL5UtJHus?t=2765

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String, 
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);