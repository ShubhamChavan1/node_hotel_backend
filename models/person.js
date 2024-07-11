const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const personSchema = mongoose.Schema({
   username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    mobileNo: {
        type: Number,
        required: true
    },

    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },

    address: {
        type: String,
        required: true
    }
})


const person = mongoose.model('person', personSchema)

module.exports = person;