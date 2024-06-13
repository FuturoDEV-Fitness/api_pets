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
    response.send("Bem vindo usuario")
})

app.post('/vacinas', async (request, response) => {
    try {

        const dados = request.body

        if (!dados.nome || !dados.descricao || !dados.dose) {
            return response.status(400).json({ mensagem: 'Nome,descricao e dose são obrigatorios' })
        }

        await conexao.query(`
        INSERT INTO vacinas 
                (
                    nome,
                    descricao,
                    dose
                )
                values
                (
                    $1,
                    $2,
                    $3
                )
    `, [dados.nome, dados.descricao, dados.dose])

        response.status(201).json({ mensagem: 'Vacina criada com sucesso' })
    } catch {
        response.status(500).json({ mensagem: 'Não possível cadastrar a vacina' })
    }
})

/*
Body - post e put
query params -> get
route params -> delete, put e get(situacao)
*/
app.delete('/pets/:id', (request, response) => {
    const id = request.params.id

    conexao.query("DELETE FROM pets where id = $1", [id])

    response.status(204).json({mensagem: ',,,,,'})
})

app.get("/pets", async (request,response) => {
    const dados = request.query
    console.log(dados)

    if(dados.nome) {
        const pets = await conexao.query("SELECT * from pets where nome ilike $1", [`%${dados.nome}%`])
        response.status(200).json(pets.rows)
    } else {
        const pets = await conexao.query("SELECT * from pets")
        response.status(200).json(pets.rows)
    }   
})

/* Cadastrar - Body (corpo) */
app.post('/pets', async (request, response) => {
    try {
        const dados = request.body

        if (!dados.nome || !dados.tipo || !dados.idade || !dados.raca) {
            return response
                .status(400)
                .json({ mensagem: "O nome, o tipo, a raça e a idade são obrigatórios" })
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
        response.status(500).json({ mensagem: 'Não possível cadastrar o pet' })
    }
})

app.listen(3000, () => {
    console.log("Servidor Online")
})
