const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const {hashSync} = require('bcryptjs');
const Permissao = require("./Permissao");
const UsuarioPermissoes = require("./UsuarioPermissoes");

const Usuario = connection.define('usuarios', {
    nome: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING
    },
    password_hash: {
        type: DataTypes.STRING
    }
})

// hooks

Usuario.belongsToMany(Permissao, { 
    through: UsuarioPermissoes,
    foreignKey: 'usuarioId',
    otherKey: 'permissaoId'
});

// Permissao.belongsToMany(Usuario, { 
//     through: UsuarioPermissoes,
//     foreignKey: 'permissaoId',
//     otherKey: 'usuarioId'
// });

// UsuarioPermissoes.hasMany(Usuario, {foreignKey: 'id'})

Usuario.beforeSave((usuario) => {
    usuario.password_hash = hashSync(usuario.password_hash, 10)
    return usuario
})

module.exports = Usuario