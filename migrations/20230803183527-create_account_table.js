'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('account', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      username: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      two_fa_key: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      create_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      }
    });
  },

  async down(queryInterface, _) {
    return queryInterface.dropTable('account');
  }
};
