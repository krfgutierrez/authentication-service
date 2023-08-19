'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('session', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      account_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'account',
          key: 'id'
        } 
      },
      access_token: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      refresh_token: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
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
    return queryInterface.dropTable('session');
  }
};
