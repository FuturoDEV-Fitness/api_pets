const { Router } = require('express')

const responsaveisRoutes = require('./responsaveis.routes')
const cursosRoutes = require('./cursos.routes')
const usuariosRoutes = require('./usuarios.routes')

const routes = new Router()

routes.use('/responsaveis', responsaveisRoutes)
routes.use('/cursos', cursosRoutes)
routes.use('/usuarios', usuariosRoutes)


module.exports = routes