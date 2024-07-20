'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('usuario_permissoes', 
      {
        id: {
          allowNull:false,
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        usuarioId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'usuarios',
            key: 'id'
          }
        },
        permissaoId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'permissoes',
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario_permissoes');
  }
};
