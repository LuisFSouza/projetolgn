const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser=require('body-parser')
const routes = require('./src/routes/routes')
const app = express()

const passport = require('passport');
const session = require('express-session');
require('./src/config/auth')(passport);

app.use(session({
    
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 30*60*1000}
}));


app.set('view engine','ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use(express.json());

app.use(passport.initialize());
app.use(passport.session())

app.use(routes)

app.listen(3000);