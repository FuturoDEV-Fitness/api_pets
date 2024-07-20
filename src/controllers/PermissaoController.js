const Permissao = require("../models/Permissao")
const Usuario = require("../models/Usuario")


class PermissaoController {
    async criar(request, response) {
        try {
            const descricao = request.body

            const permissao = await Permissao.create(descricao)
            response.status(201).json(permissao)
        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao cadastrar a permissao'
            })
        }
    }

    async listarTodos(request, response) {
        try {
            const permissoes = await Permissao.findAll()
            response.json(permissoes)
        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao listar as permissoes'
            })
        }
    }

    async deletar(request, response) {
        try {
            const id = request.params.id
            const permissao = await Permissao.findByPk(id)

            if (!permissao) {
                response
                    .status(404)
                    .json({ mensagem: 'Não foi encontrado a permissao' })
            }

            await permissao.destroy()

            response.status(204).json()

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao deletar a permissao'
            })
        }
    }

    async atribuirPermissao(request, response) {
        try{
            const { usuarioId, permissaoId } = request.body

            const usuario = await Usuario.findByPk(usuarioId)
            const permissao = await Permissao.findByPk(permissaoId)

            if (!usuario || !permissao) {
                response.status(404).json({ mensagem: 'Usuário ou permissão não encontrados' })
            }

            await usuario.addPermissoes(permissao)

            response.status(204).json()
        }
        catch(error) {
            console.log(error)
            response.status(500).json({ mensagem: 'A requisição falhou' })
        }

    }
}

module.exports = new PermissaoController()