
const verificarPermissao = (permissoesRequeridas)  => {
    return (request, response, next) => {
        try{
            const { usuarioId } = request

            const usuario = await Usuario.findByPk(usuarioId, {
                include: {
                    model: Permissao,
                    through: {
                        attributes: []
                    }
                }
            }); // usuario = {name, email, senha, permissoes: [{permissao1}
                //    ,{permissao2}, {permissao3}]}



            // Pega todas as permissoes atribuidas ao usuario e coloca na variavel permissoesUsuario
            const permissoesUsuario = usuario.permissoes.map(p => p.descricao) //  ['permissao1', 'permissao2']
            const temPermissao = permissoesRequeridas.every(permissao => permissoesUsuario.includes(permissao))

            permissoesRequeridas = [permissao1, permissao2]
            permissoesUsuario = [permissao1, permissao2, permissao3] -> true, true -> true

            if(!temPermissao) {
                return response.status(401).json({ mensagem: 'Usuário não tem uma ou mais permissões' })
            }

            next();
        } catch (error) {
            console.log(error)
            response.status(500).json({ mensagem: 'A requisição falhou' })
        }
    }
}

module.exports = verificarPermissao