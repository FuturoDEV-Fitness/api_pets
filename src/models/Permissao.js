const { DataTypes } = require("sequelize")
const connection = require('../database/connection')

const Permissao = connection.define('permissao', {
    descricao: DataTypes.STRING
})

module.exports = Permissao