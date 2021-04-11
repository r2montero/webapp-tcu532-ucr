const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String, 
        trim: true,
        required: true
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);