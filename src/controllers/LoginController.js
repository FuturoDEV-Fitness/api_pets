const Usuario = require("../models/Usuario")
const { compareSync } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

class LoginController {

    async login(request, response) {
        try {
            const dados = request.body

            if (!dados.email || !dados.password) {
                return response
                    .status(400)
                    .json({ mensagem: 'Nome e senha são obrigatórios' })
            }

            const usuario = await Usuario.findOne({
                where: {
                    email: dados.email
                }
            })

            if (!usuario) {
                return response
                    .status(404)
                    .json({ mensagem: 'Conta não encontrada' })
            }

            const senhaEstaCorreta = compareSync(dados.password, usuario.password_hash)

            if (senhaEstaCorreta === false) {
                return response
                    .status(404)
                    .json({
                        mensagem: 'Conta não encontrada com esse email ou senha'
                    })
            }

            const token = sign({
                id: usuario.id
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            )

            response.json({
                token: token,
                nome: usuario.nome
            })

        } catch (error) {
            console.log(error)
            response.status(500).json({ mensagem: 'Erro ao realizar login' })
        }
    }

}

module.exports = new LoginController()