const User = require('../models/User')
const bcrypt = require('bcryptjs')
var xss = require("xss");

module.exports = {
  async selectUsers(req, res) {
    const users = await User.selectUsers()
    res.render('users', { users })
  },

  async renderViewUser(req, res) {
    res.render('new-user')
  },

  async insertUser(req, res) {
    const email = xss(req.body.email)
    
    const result = await User.selectUserByEmail(email).then(user => { return user })

    if (Object.keys(result).length === 0) {
      const password = bcrypt.hashSync(xss(req.body.password), 10)

      const msg = await User.save({ email, password })
      res.render('new-user', { msg })

    }
    else {
      const msg = { tipo: "erro", corpo: "Este usuario ja está cadastrado" }
      res.render('new-user', { msg })
    }

  },

  async renderViewEditUser(req, res) {
    const id = Number(req.params.id)
    const user = await User.selectUserById(id).then(user => { return user })
    res.render('new-user', { user })
  },

  async editUser(req, res) {
    const id = Number(req.params.id)
    const email = xss(req.body.email)
    
    const result = await User.selectUserByEmail(email).then(user => { return user })
    const result2 = await User.selectUserById(id).then(user => { return user })

    if (Object.keys(result).length === 0 || result[0]['email'] === result2['email']) {
      const password = bcrypt.hashSync(xss(req.body.password), 10)
      if(xss(req.body.password) != "")
      {
        const msg = await User.edit({ email, password }, id)
        if (msg.tipo === "sucesso") {
          res.redirect('/users')
        }
        else {
  
          res.render('new-user', { msg })
        }
      }
      else
      {
        const msg = await User.edit({ email }, id)
        if (msg.tipo === "sucesso") {
          res.redirect('/users')
        }
        else {
          
          res.render('new-user', { msg })
        }
      }
    }
    else {
      const user = await User.selectUserById(id).then(user => { return user })
      const msg = { tipo: "erro", corpo: "Este email ja está cadastrado. O campo email foi restaurado para seu valor original" }
      res.render('new-user', { msg, user })
    }

  },

  async deleteUser(req, res) {
    const id = Number(req.params.id)
    await User.remove(id)
    res.redirect('/users')
  }
}




