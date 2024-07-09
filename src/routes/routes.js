const { Router } = require('express')

const responsaveisRoutes = require('./responsaveis.routes')
const cursosRoutes = require('./cursos.routes')

const routes = new Router()

routes.use('/responsaveis', responsaveisRoutes)
routes.use('/cursos', cursosRoutes)

module.exports = routes