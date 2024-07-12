const { Router } = require('express')

const responsaveisRoutes = require('./responsaveis.routes')
const cursosRoutes = require('./cursos.routes')
const usuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')

const routes = new Router()

routes.use('/responsaveis', responsaveisRoutes)
routes.use('/cursos', cursosRoutes)
routes.use('/usuarios', usuariosRoutes)
routes.post('/login', LoginController.login)

module.exports = routes