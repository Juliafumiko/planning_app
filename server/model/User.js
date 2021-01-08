const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        min:3,
        max: 80,
    },
    lastname:{
        type: String,
        required: true,
        min:3,
        max: 80
    },
    email: {
        type: String,
        required: true,
        min: 8,
        max: 2000
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 2000
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', userSchema);