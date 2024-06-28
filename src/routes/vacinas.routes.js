const {Router} = require('express')
const VacinaController = require('../controllers/VacinaController')

const vacinasRoutes = new Router()

vacinasRoutes.post('/', VacinaController.criar)
vacinasRoutes.get('/', VacinaController.listarTodos)

module.exports = vacinasRoutes