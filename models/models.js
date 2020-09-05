const mongoose = require('mongoose');

const model = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add name'],
        unique: true,
        trim: true,

    },
    slug: String,
    jobDescription: String,
    Requirement: String,
    jobLocation: String,
    itemRequest: String,
    phone: Number,
    email: String,
})

module.exports = mongoose.model('Bootcamps', model);