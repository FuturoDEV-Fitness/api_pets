const {Router} = require("express")
const CursoController = require("../controllers/CursoController")

const cursosRoutes = new Router()

cursosRoutes.post('/', CursoController.criar )
cursosRoutes.get('/', CursoController.buscarTodos )
cursosRoutes.delete('/:id', CursoController.deletar)
cursosRoutes.put('/:id', CursoController.atualizar)
cursosRoutes.get('/:id', CursoController.buscarUm)

module.exports = cursosRoutes