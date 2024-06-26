const { Router } = require('express')

const ServicoController = require('../controllers/ServicoController')

const servicosRoutes = new Router()

servicosRoutes.post('/', ServicoController.criar)
servicosRoutes.get('/', ServicoController.listarTodos)

module.exports = servicosRoutes