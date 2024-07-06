const {Router} = require('express')
const Responsavel = require('../models/Responsavel')

const responsaveisRoutes = new Router()

responsaveisRoutes.post('/', async(request, response) => {
    const dados = request.body

    const responsavel = await Responsavel.create({
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        senha: dados.senha,
        sexo: dados.sexo
    })

    response.json(responsavel)

})

responsaveisRoutes.get('/', async(request, response) => {
    const responsaveis = await Responsavel.findAll()

    response.json(responsaveis)
})

responsaveisRoutes.get('/:id', async(request, response) => {
    const resposavelID = request.params.id

    const responsavel = await Responsavel.findByPk(resposavelID)

    if(!responsavel){
        return response.status(404).json({mensagem: 'Responsável não encontrado'})
    }

    response.json(responsavel)
})

responsaveisRoutes.put('/:id', async(request, response) => {
    const resposavelID = request.params.id
    const dados = request.body

    const responsavel = await Responsavel.findByPk(resposavelID)

    if(!responsavel){
        return response.status(404).json({mensagem: 'Responsável não encontrado'})
    }

    responsavel.nome = dados.nome
    responsavel.idade = dados.idade
    responsavel.email = dados.email
    responsavel.senha = dados.senha
    responsavel.sexo = dados.sexo

    await responsavel.save()

    response.json(responsavel)
})

responsaveisRoutes.delete('/:id', async(request, response) => {
    const resposavelID = request.params.id

    const responsavel = await Responsavel.findByPk(resposavelID)

    if(!responsavel){
        return response.status(404).json({mensagem: 'Responsável não encontrado'})
    }

    await responsavel.destroy()

    response.json({mensagem: 'Responsável excluído com sucesso'})
})

module.exports = responsaveisRoutes