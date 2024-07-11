const mongoose = require('mongoose');
require('dotenv').config();
// const mongooseURL = 'mongodb://localhost:27017/hotel'

const mongooseURL = process.env.mongooseDB
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