//require mongooose
const mongoose = require('mongoose');

//define schema for mongodb
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    color: {
        type: String,
        trim: true
    },
    icon: {
        type: String,
        trim: true
    }
});

//export model

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;