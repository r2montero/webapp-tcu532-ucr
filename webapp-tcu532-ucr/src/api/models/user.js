const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: true
    },
    phone: {
        type: Number
    },
    password: {
        type: String, 
        required: true
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);