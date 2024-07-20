const { DataTypes } = require('sequelize')
const connection = require('../database/connection')

const UsuarioPermissoes = connection.define('usuario_permissoes', {
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    permissaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'permissoes',
            key: 'id'
        }
    }
})

module.exports = UsuarioPermissoes