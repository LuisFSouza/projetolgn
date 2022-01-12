const User = require('../models/User')
const express = require('express')
const routes = express.Router()


routes.get("/users", async(req,res)=>{
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


routes.get("/users/edit/:id", async (req,res)=>{
    const id = Number(req.params.id)
    const user = await User.selectUser(id)
    res.render('new-user', {user})
})

routes.post("/users/edit/:id", async(req,res)=>{
    const id = Number(req.params.id)
    const email = req.body.email
    const password = req.body.password

    const msg = await User.edit({email,password}, id)
    
    if(msg.tipo === "sucesso"){
      res.redirect('/users')
    }
    else{
      res.render('new-user', {msg})
    }
  })

routes.get("/users/delete/:id", async(req,res)=>{
    const id = Number(req.params.id)
    await User.remove(id)
    res.redirect('/users')
  })

module.exports = routes