const express = require('express')
const app = express()
const db = require('./db');
const passport = require('./auth')
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const logRequest = (req, res, next) => {
     console.log(`[${new Date().toLocaleString()}] request made : ${req.originalUrl}`);
     next();
}
app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', function (req, res) {
     res.send('welcome to Hotel California');
})

const menuRouter = require('./routes/menuRoutes');
app.use('/menu',  menuRouter);

const personRouter = require('./routes/personRoutes');
app.use('/person', personRouter);

const port = process.env.PORT
app.listen(port, () => {
     console.log("SERVER IS UP");
})

//for testing

