'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('animal', [{
          fk_id_pessoa: 1,
          id_fazenda: 1,
          nome: "Boi",
          raca: "Brahman",
          sexo: 'M',
          dt_nascimento: new Date()
        }] 
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('animal', null, {});
  }
};
