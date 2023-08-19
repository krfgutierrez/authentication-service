'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.renameTable('account', 'accounts'),
      queryInterface.renameTable('session', 'sessions'),
      queryInterface.renameTable('transaction_code', 'transaction_codes'),
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.renameTable('accounts', 'account'),
      queryInterface.renameTable('sessions', 'session'),
      queryInterface.renameTable('transaction_codes', 'transaction_code'),
    ]);
  }
};
