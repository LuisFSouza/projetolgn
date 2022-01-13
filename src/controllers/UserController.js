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
    
    const result = await User.selectUserByEmail(email)

    if (result === undefined) {
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
    const user = await User.selectUser(id)
    res.render('new-user', { user })
  },

  async editUser(req, res) {
    const id = Number(req.params.id)
    const email = xss(req.body.email)
    
    const result = await User.selectUserByEmail(email);
    const result2 = await User.selectUser(id);

    if (result === undefined || result['email'] === result2['email']) {
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
      const user = await User.selectUser(id)
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




