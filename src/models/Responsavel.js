const { DataTypes } = require('sequelize');
const { connection } = require('../database/Database');

const Responsavel = connection.define('responsaveis', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
        allowNull: false
    }
})

module.exports = Responsavel;