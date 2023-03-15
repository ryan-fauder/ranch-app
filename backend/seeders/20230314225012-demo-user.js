'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('people', [{
          name: "João Alberto",
          email: "joao.alberto@gmail.com",
          gender: 'M',
          address: "Rua SP"
        }] 
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('people', null, {});
  }
};
