const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({


    title :{
        type : String,
        required : true
    },

    description: {
        type:String,
        required : true
    },

    priority : {
         type : Number,
         require :true        
    },

    duedate : {
        type :Date,
    }

    
})

const task = mongoose.model('task' ,taskSchema)
module.exports = task