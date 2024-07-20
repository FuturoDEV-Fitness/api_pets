const {Router} = require('express')
const CursoController = require('../controllers/CursoController')
const verificarPermissao = require('../middlewares/verificarPermissao')

const cursosRoutes = new Router()

cursosRoutes.post('/', verificarPermissao(['criarCursos']) , CursoController.criar) // 'criarCursos'
cursosRoutes.get('/', verificarPermissao(['listarCursos']), CursoController.listaTodos) 
cursosRoutes.get('/:id', CursoController.listarUm)
cursosRoutes.delete('/:id', verificarPermissao(['listarCursos', 'deletarCursos']) ,CursoController.deletar)
cursosRoutes.put('/:id', CursoController.atualizar)

module.exports = cursosRoutes