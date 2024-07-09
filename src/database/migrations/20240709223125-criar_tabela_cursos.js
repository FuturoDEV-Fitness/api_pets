'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     
     await queryInterface.createTable(
      'cursos',
      {
        id: {
           primaryKey: true,
           autoIncrement: true,
           type: Sequelize.INTEGER,
           allowNull: false
        },
        nome: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        duracao: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
      }
     )

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cursos');
  }
};
