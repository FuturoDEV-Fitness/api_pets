const Curso = require('../models/Curso')

class CursoController {

    async buscarTodos(request, response) {
        try {
            const cursos = await Curso.findAll()
            response.json(cursos)
        } catch (error) {
            response.status(500).json({
                mensagem: 'Não foi possivel buscar os cursos'
            })
        }

    }

    async deletar(request, response) {

        try {
            const id = request.params.id
            const curso = await Curso.findByPk(id)

            if (!curso) {
                return response.status(404).json({
                    mensagem: 'Não foi encontrado um curso com esse id'
                })
            }

            await curso.destroy()

            response.status(204).json()
        } catch (error) {
            response.status(500).json({
                mensagem: 'Não foi possivel buscar o curso'
            })
        }
    }

    async criar(request, response) {
        try {
            const dados = request.body;
            /* validacao */
            const curso = await Curso.create(dados)
            return response.status(201).json(curso)
        } catch (error) {
            response.status(500).json({
                mensagem: 'Não foi possivel criar o curso'
            })
        }
    }

    async atualizar(request, response) {
        try {
            const id = request.params.id
            const dados = request.body

            const curso = await Curso.findByPk(id)

            if (!curso) {
                return response.status(404).json({
                    mensagem: 'Não foi encontrado um curso com esse id'
                })
            }

            curso.nome = dados.nome
            curso.duracao = dados.duracao

            await curso.save()

            response.json(curso)

        } catch (error) {
            console.log(error)
            response.status(500).json({
                mensagem: 'Não foi possivel atualizar o curso'
            })
        }
    }

    async buscarUm(request ,response) {
        const id = request.params.id
        const curso = await Curso.findByPk(id)

        if (!curso) {
            return response.status(404).json({
                mensagem: 'Não foi encontrado um curso com esse id'
            })
        }

        response.json(curso)
    }
}

module.exports = new CursoController()