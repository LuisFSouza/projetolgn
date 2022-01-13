const userController = require('../controllers/UserController')
const loginController = require('../controllers/Login')
const express = require('express');
const autenticated = require('../middleware/autenticated');
const routes = express.Router()

routes.get('/login', loginController.renderViewLogin);
routes.post('/login', loginController.login);
routes.post('/logout', autenticated.checkAuthenticated, loginController.logout);
routes.get('/users', autenticated.checkAuthenticated, userController.selectUsers);
routes.get('/users/new', autenticated.checkAuthenticated, userController.renderViewUser);
routes.post('/users/new', autenticated.checkAuthenticated, userController.insertUser);
routes.get('/users/edit/:id', autenticated.checkAuthenticated, userController.renderViewEditUser);
routes.post('/users/edit/:id', autenticated.checkAuthenticated, userController.editUser);
routes.get('/users/delete/:id', autenticated.checkAuthenticated, userController.deleteUser);

module.exports = routes