const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },


    taste: {
        type: String,
        enum: ["sweet", "salty", "spicy"],
        require: true
    },

    isToDrink: {
        require :true ,
        type: Boolean,
        default: false
    },

    ingredients : {
        type : [String] ,
        default : []
    },

    noOfsales : {
          type : Number,
          default : 0
    }
})

const menu = mongoose.model('menu',menuSchema)
module.exports = menu