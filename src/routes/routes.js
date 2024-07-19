const { Router } = require('express')

const responsaveisRoutes = require('./responsaveis.routes')
const cursosRoutes = require('./cursos.routes')
const usuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')
const validaToken = require('../middlewares/validaToken')

const routes = new Router()

routes.use('/usuarios', usuariosRoutes)
routes.post('/login', LoginController.login)

routes.use('/responsaveis', validaToken, verificarPermissao(['admin']), responsaveisRoutes)
routes.use('/cursos', validaToken, cursosRoutes) // 'cursos'


module.exports = routes