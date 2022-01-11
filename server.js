const express = require('express')
const bodyParser=require('body-parser')

const routes = require('./src/controllers/UserController')

const app = express()

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(routes)

app.listen(3000);