const { Router } = require('express')
const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'pets_bd'
})

const servicosRoutes = new Router()

servicosRoutes.post('/', async (request, response) => {

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
})

module.exports = servicosRoutes