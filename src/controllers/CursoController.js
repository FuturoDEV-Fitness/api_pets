const Curso = require("../models/Curso")


class CursoController {

    async listaTodos(request, response) {
        try {
            const { nome } = request.query

            const cursos = await Curso.findAll({
                where: nome ? { nome: nome } : {},
                attributes: [
                    ['id', 'identificador'],
                    'nome',
                    'duracao'
                ],
                order: [['duracao', 'DESC']]
            })

            if(cursos.length === 0) {
                response.status(404).json({ mensagem: 'Não foi encontrado nenhum curso' })
            }

            response.json(cursos)
        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao listar os curso'
            })
        }
    }

    async listarUm(request, response) {
        try {
            const id = request.params.id

            const curso = await Curso.findByPk(id)

            if (!curso) {
                response
                    .status(404)
                    .json({ mensagem: 'Não foi encontrado o curso' })
            }

            response.json(curso)

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao listar o curso'
            })
        }
    }

    async criar(request, response) {
        try {
            const dados = request.body
            /* validacao */
            const curso = await Curso.create(dados)
            response.status(201).json(curso)
        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao cadastrar o curso'
            })
        }
    }

    async deletar(request, response) {
        try {
            const id = request.params.id
            const curso = await Curso.findByPk(id)

            if (!curso) {
                response
                    .status(404)
                    .json({ mensagem: 'Não foi encontrado o curso' })
            }

            await curso.destroy()

            response.status(204).json()

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao deletar o curso'
            })
        }
    }

    async atualizar(request, response) {
        try {
            const id = request.params.id
            const dados = request.body

            const curso = await Curso.findByPk(id)

            if (!curso) {
                response
                    .status(404)
                    .json({ mensagem: 'Não foi encontrado o curso' })
            }

            curso.nome = dados.nome
            curso.duracao = dados.duracao
            await curso.save()

            response.json(curso)

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao atualiza o curso'
            })
        }
    }

    async listarPorParametro(request, response) {
        try {
            const { nome } = request.query

            const cursos = await Curso.findAll({
                where: {
                    nome: nome
                }
            })

            response.json(cursos)

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao listar os cursos'
            })
        }
    }
}

module.exports = new CursoController()