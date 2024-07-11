const  {Router} = require('express')
const UsuarioController = require('../controllers/UsuarioController')

const usuariosRoutes = new Router()

usuariosRoutes.post('/', UsuarioController.criarConta)

module.exports = usuariosRoutes