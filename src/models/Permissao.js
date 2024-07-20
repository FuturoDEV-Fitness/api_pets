const { DataTypes } = require("sequelize")
const connection = require('../database/connection')

const Permissao = connection.define('permissoes', {
    descricao: {
        type: DataTypes.STRING
    }
})

module.exports = Permissao