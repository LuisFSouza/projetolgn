const User = require('../models/User')
const express = require('express')
const routes = express.Router()


routes.get("/", async(req,res)=>{
    const users = await User.selectUsers()

    res.render('users', {users})
})

routes.get("/users/new",(req,res)=>{
    res.render('new-user')
})
  
routes.post("/users/new", async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    
    const msg = await User.save({email,password})
    res.render('new-user', {msg})
})

  

module.exports = routes