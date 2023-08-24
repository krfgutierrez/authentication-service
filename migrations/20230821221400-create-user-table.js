'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      account_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          key: 'id',
          model: 'accounts'
        }
      },
      first_name: {
        type: Sequelize.DataTypes.CHAR(100),
      },
      last_name: {
        type: Sequelize.DataTypes.CHAR(100),
      },
      date_of_birth: {
        type: Sequelize.DataTypes.DATEONLY,
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
