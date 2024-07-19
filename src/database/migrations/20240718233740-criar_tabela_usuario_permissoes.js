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
        usuario_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'usuarios',
            key: 'id'
          }
        },
        permissao_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'permissoes',
            key: 'id'
          }
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario_permissoes');
  }
};
