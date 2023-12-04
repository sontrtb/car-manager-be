'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER,
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

    return queryInterface.bulkInsert('Settings', [{
      price: 30000,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Settings');
  }
};