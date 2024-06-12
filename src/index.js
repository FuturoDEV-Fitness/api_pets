const express = require('express')
const {Pool} = require('pg')

const app = express() 
app.use(express.json())

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'pets_bd'
})

/* Ação, path e da implementação  */

app.get('/bemvindo', (request, response) => {
    response.send("Bem vindo")
})

/* CRUD pets */

app.post('/pets',  async (request, response) => {
    try {
        const dados = request.body

        if (!dados.nome || !dados.tipo || !dados.idade || !dados.raca) {
            return response.send("O nome, o tipo, a raça e a idade são obrigatórios")
        }

         await conexao.query(
            `INSERT INTO pets 
             (
                nome,
                idade,
                raca,
                tipo,
                responsavel
            )
            values
            (
                $1,
                $2,
                $3,
                $4,
                $5
            )
        `, [dados.nome, dados.idade, dados.raca, dados.tipo, dados.responsavel]);

        console.log(dados)

        response.status(201).json({ mensagem: 'Criado com sucesso' })
    } catch {
       response.status(500).json({mensagem: 'Não possível cadastrar o pet'})
    }
})

app.listen(3000, () => {
    console.log("Servidor Online")
}) 

