const mongoose = require('mongoose')

const personSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    mobileNo: {
        type: Number,
        require: true
    },

    work: {
        type: String, 
        enum : ['chef','waiter','manager'],
        require :true
    },
      
    address:{
        type :String,
       require : true
    }
})


const person = mongoose.model('person',personSchema)

module.exports = person;