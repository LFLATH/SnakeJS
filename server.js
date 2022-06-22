const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const session = require('express-session');
const flash = require("connect-flash");
require('./config/passport')(passport); 



const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = async() => {
    await mongoose.connect(process.env.MongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    return mongoose;
};

await connectToMongo().then(async() => console.log('connected yeee'));




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

