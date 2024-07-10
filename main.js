const express = require('express')
const app = express()
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
     res.send('welcome to Hotel California');
})


const menuRouter = require('./routes/menuRoutes');
app.use('/menu',menuRouter);

const personRouter = require('./routes/personRoutes');
app.use('/person', personRouter);


app.listen(3000, () => {
     console.log("SERVER IS UP");
})

//for testing

