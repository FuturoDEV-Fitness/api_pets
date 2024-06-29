const Database = require("../database/Database")

class VacinaController extends Database {

    async criar(request, response) {
        try {

            const dados = request.body
    
            if (!dados.nome || !dados.descricao || !dados.dose) {
                return response.status(400).json({ mensagem: 'Nome,descricao e dose são obrigatorios' })
            }
    
            await this.database.query(`
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
    }

    async listarTodos(request, response) {
        const vacinas = await this.database.query("SELECT * from vacinas order by nome")
        response.json(vacinas.rows)
    }
}

module.exports = new VacinaController()