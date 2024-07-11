const padraoEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) 

class UsuarioController {

    async criarConta(request, response) {
        try {
            const dados = request.body

            if(!dados.nome) {
                return response
                .status(400)
                .json({mensagem: 'O nome é obrigatório'})
            }

            if(padraoEmail.test(dados.email) === false) {
                return response
                    .status(400)
                    .json({mensagem: 'O email está no formato inválido'})
            }

            if(!(dados.password?.length >= 8 && dados.password?.length <= 16)) {
                return response
                    .status(400)
                    .json({mensagem: 'A senha deve ter entre 8 e 16 dígitos'})
            }

            response.json({mensagem: 'sucesso'})

        } catch (error) {
            response
            .status(500)
            .json({
                mensagem: 'Não possível criar a conta'
            })
        }
    }
}

module.exports = new UsuarioController()