'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('transaction_code', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      valid_until: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        validate: {
          isFutureDate(value) {
            if (value <= new Date()) {
              throw new Error('Validity of transaction code must be in the future.');
            }
          },
        }
      },
      type: {
        type: Sequelize.TEXT,
        allowNull: false,
        values: [
          'forgot_password'
        ],
      },
      create_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      }
    });
  },

  async down(queryInterface, _) {
    return queryInterface.dropTable('transaction_code');
  }
};
