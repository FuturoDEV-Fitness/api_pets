const { Router } = require('express')

const responsaveisRoutes = require('./responsaveis.routes')

const routes = new Router()

routes.use('/responsaveis', responsaveisRoutes)


module.exports = routes