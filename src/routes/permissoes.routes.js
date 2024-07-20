const { Router } = require("express");
const PermissaoController = require("../controllers/PermissaoController");

const permissoesRoutes = new Router();

permissoesRoutes.post('/', PermissaoController.criar)
permissoesRoutes.get('/', PermissaoController.listarTodos)
permissoesRoutes.delete('/:id', PermissaoController.deletar)

permissoesRoutes.post('/atribuir', PermissaoController.atribuirPermissao)

module.exports = permissoesRoutes;