const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = Category = mongoose.model('Category', CategorySchema);