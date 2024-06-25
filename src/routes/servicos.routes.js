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
    const dados = request.body
    
    const servico =  await conexao.query(`
            INSERT INTO servicos
             (nome,descricao,preco)
             values
             ($1,$2,$3)
             returning *
        `, [dados.nome,dados.descricao,dados.preco])

    response.status(201).json(servico.rows[0])

})

module.exports = servicosRoutes