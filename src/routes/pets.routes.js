const { Router } = require('express')
const { Pool } = require('pg')

const petsRoutes = new Router()

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'api_pets'
})


petsRoutes.put("/:id", async (request, response) => {
    const dados = request.body
    const id = request.params.id

    const dadosDoPet = await conexao.query("SELECT * FROM pets where id = $1", [id])

    await conexao.query(`
        UPDATE pets 
            set nome = $1,
            idade = $2,
            raca = $3,
            tipo = $4,
            responsavel = $5  
            where id = $6
            `,
        [
            dados.nome || dadosDoPet.rows[0].nome,
            dados.idade || dadosDoPet.rows[0].idade,
            dados.raca || dadosDoPet.rows[0].raca,
            dados.tipo || dadosDoPet.rows[0].tipo,
            dados.responsavel || dadosDoPet.rows[0].responsavel,
            id
        ]
    )

    response.json({ mensagem: 'atualizado com sucesso' })

})

petsRoutes.get("/:id", async (request, response) => {
    try {
        const id = request.params.id

        const pet = await conexao.query("SELECT * from pets where id = $1", [id])

        if (pet.rows.length === 0) {
            return response.status(404).json({ mensagem: 'Não foi encontrado um pet com id' })
        }

        response.json(pet.rows[0])
    } catch {
        response.status(500).json({ mensagem: 'Não possível cadastrar o pet' })
    }

})

petsRoutes.delete('/:id', async (request, response) => {
    const id = request.params.id

    const pet = await conexao.query("SELECT * from pets where id = $1", [id])

    if (pet.rows.length === 0) {
        return response.status(404).json({ mensagem: 'Não foi encontrado um pet com id' })
    }

    conexao.query("DELETE FROM pets where id = $1", [id])

    response.status(204)
})

petsRoutes.get("/", async (request, response) => {
    const dados = request.query
    console.log(dados)

    if (dados.nome) {
        const pets = await conexao.query("SELECT * from pets where nome ilike $1", [`%${dados.nome}%`])
        response.status(200).json(pets.rows)
    } else {
        const pets = await conexao.query("SELECT * from pets")
        response.status(200).json(pets.rows)
    }
})

/* Cadastrar - Body (corpo) */
petsRoutes.post('/', async (request, response) => {
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

module.exports = petsRoutes