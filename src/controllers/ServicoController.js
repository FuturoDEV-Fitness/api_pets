/* objetos 
module.exports = {
    criar: (request,response) => {

    }
}
*/

const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'pets_bd'
})


class ServicoController {

    async listarTodos(request, response) {

        const filtros = request.query

        if (filtros.filtro) {
            const servicos = await conexao.query(`
                    select * from servicos
                    where nome ilike $1
                    or descricao ilike $1
                `, [`%${filtros.filtro}%`])
            response.json(servicos.rows)
        } else {
            const servicos = await conexao.query(`
                select * from servicos
            `)
            response.json(servicos.rows)
        }
    }

    async criar(request, response) {

        try {
            const dados = request.body

            if (!dados.nome || (!dados.preco && dados.preco !== 0)) {
                return response.status(400).json({
                    mensagem: 'O nome e o preço são obrigatórios'
                })
            }

            const servico = await conexao.query(`
            INSERT INTO servicos
             (nome,descricao,preco)
             values
             ($1,$2,$3)
             returning *
        `, [dados.nome, dados.descricao, dados.preco])

            response.status(201).json(servico.rows[0])
        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao cadastrar o serviço'
            })
        }
    }

    async listarUm(request, response) {
        try {
            const id = request.params.id

            const servico = await conexao.query(`
                SELECT id,nome,preco from servicos
                where id  = $1
            `, [id])

            if (servico.rows.length === 0) {
                return response.status(404).json({
                    mensagem: 'Não foi encontrado um serviço com esse id'
                })
            }

            response.json(servico.rows[0])

        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao listar o serviço'
            })
        }
    }

    async deletar(request, response) {
        try {
            const id = request.params.id

            const servico = await conexao.query(`
                delete from servicos
                where id = $1
                `, [id])

            if (servico.rowCount === 0) {
                return response.status(404).json({
                     mensagem: 'Não foi encontrado um serviço com esse id'
                })
            }
            
            response.status(204).json()
        } catch (error) {
            response.status(500).json({
                mensagem: 'Houve um erro ao deletar o serviço'
            })
        }
    }
}

module.exports = new ServicoController()