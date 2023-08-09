'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('account', [
      {
        username: "king@gmail.com",
        password: "password123",
        twoFaSecret: null,
      },
      {
        username: "richard@gmail.com",
        password: "password123",
        twoFaSecret: "twoFaSecret",
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('account', null, {});
  }
};
