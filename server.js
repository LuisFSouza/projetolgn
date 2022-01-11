const express = require('express')
const knex = require('./src/database')

const app = express()

app.set('view engine','ejs')

app.get('/', (req,res) => {
    res.render('index.ejs')
})

app.listen(3000);