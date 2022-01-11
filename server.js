const express = require('express')

const routes = require('./src/controllers/UserController')

const app = express()

app.set('view engine','ejs')

app.use(routes)

app.listen(3000);