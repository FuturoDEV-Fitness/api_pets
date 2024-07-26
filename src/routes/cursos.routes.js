const {Router} = require('express')
const CursoController = require('../controllers/CursoController')
const verificarPermissao = require('../middlewares/verificarPermissao')

const cursosRoutes = new Router()

cursosRoutes.post('/',  CursoController.criar
 /*
    #swagger.tags = ['Cursos'],
    #swagger.description = 'Endpoint para criar um curso',
    #swagger.parameters['novoCurso'] = {
        in: 'body',
        description: 'Informações do curso',
        required: true,
        schema: { 
            $nome: 'Curso de Node',
            $duracao: 40
        }
    },
 */
) // 'criarCursos'
cursosRoutes.get('/', verificarPermissao(['listarCursos']), CursoController.listaTodos
 /*
    #swagger.tags = ['Cursos']
 */
) 
cursosRoutes.get('/:id', CursoController.listarUm
    /*
    #swagger.tags = ['Cursos']
    */
)
cursosRoutes.delete('/:id', verificarPermissao(['listarCursos', 'deletarCursos']) ,CursoController.deletar
 /*
    #swagger.tags = ['Cursos']
 */)
cursosRoutes.put('/:id', CursoController.atualizar
/*
    #swagger.tags = ['Cursos']
*/
)

module.exports = cursosRoutes

