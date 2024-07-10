const mongoose = require('mongoose');
const mongooseURL = 'mongodb://localhost:27017/hotel'

mongoose.set('strictQuery', true);

mongoose.connect(mongooseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;

db.on('connected', () => {
    console.log("connected to database");
})

db.on('disconnected', () => {
    console.log("disconnted to database");
})

module.exports = db;