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

personSchema.pre('save', async function (next) {

    const person = this;

    if (!person.isModified('password')) {
        return next();
    }
    //false then try catch false only when person modified is true
    try {

        //salt  round 
        const salt = await bcrypt.genSalt(10);

        //hash pasword generation
        const hashPassword = await bcrypt.hash(person.password, salt)

        //override plain password with hashedd password
        person.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
})

personSchema.methods.comparepassword = (async function(candidatePassword)  {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    } catch (error) {
        throw error;
    }
})
const person = mongoose.model('person', personSchema)

module.exports = person;