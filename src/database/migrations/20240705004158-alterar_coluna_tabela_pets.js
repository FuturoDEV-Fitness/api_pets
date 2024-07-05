'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('pets', 'peso', {
      allowNull: false,
      type: Sequelize.FLOAT
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pets', 'peso')
  }
};
