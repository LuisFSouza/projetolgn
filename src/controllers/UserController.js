const User = require('../models/User')
const express = require('express')
const routes = express.Router()


routes.get("/", async(req,res)=>{
    const users = await User.selectUsers()

    res.render('users', {users})
})



module.exports = routes