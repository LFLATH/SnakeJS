const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const session = require('express-session');
const flash = require("connect-flash");
require('./config/passport')(passport); 

const db = require('./config/keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err))
app.use(express.static(__dirname + '/views'));

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT 

const expressLayouts = require('express-ejs-layouts');

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}));


app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());
//Routes
app.use('/', require("./Routes/index"));
app.use('/', require("./Routes/login"));
app.use('/', require("./Routes/signup"));
app.use('/', require("./Routes/home"));


app.listen(port);

