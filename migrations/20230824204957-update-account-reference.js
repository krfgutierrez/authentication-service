'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.changeColumn('sessions', 'account_id', {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'accounts',
          key: 'id'
        }
      }),
      queryInterface.changeColumn('transaction_codes', 'account_id', {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'accounts',
          key: 'id'
        }
      }),
    ]);
    console.log('completed');
  },

  async down(queryInterface, Sequelize) {
    // This would fail because "account" was already changed to "accounts" prior this migration script.
    await Promise.all([
      queryInterface.changeColumn('sessions', 'account_id', {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'account',
          key: 'id'
        }
      }),
      queryInterface.changeColumn('transaction_codes', 'account_id', {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'account',
          key: 'id'
        }
      }),
    ]);
  }
};
