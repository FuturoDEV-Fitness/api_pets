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

app.post('/pets', (request, response) => {
    const dados = request.body

    conexao.query(`
        INSERT INTO pets 
        (
            nome,
            tipo,
            responsavel,
            raca,
            idade
        )
        VALUES
        (
           '${dados.nome}',
           '${dados.tipo}',
           '${dados.responsavel}',
           '${dados.raca}',
           '${dados.idade}' 
        )
    `)

    response.send("Cadastrado com sucesso")
})

app.listen(3000, () => {
    console.log("Servidor Online")
}) 

