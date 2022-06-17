const express = require('express');
const mongoose = require('mongoose');
const app = express();


const db = require('./config/keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err))
app.use(express.static(__dirname + '/views'));

const port = process.env.PORT || 3000

const expressLayouts = require('express-ejs-layouts');

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/', require("./Routes/index"));
app.use('/', require("./Routes/login"));
app.use('/', require("./Routes/signup"));


app.listen(port);

