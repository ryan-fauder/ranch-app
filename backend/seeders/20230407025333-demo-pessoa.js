'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('people', [
        {
          "name": "Maria Alfreda",
          "email": "alfreda@gmail.com",
          "gender": "F",
          "address": "Rua GO",
          "active": true
        },
        {
          "name": "João Alberto",
          "email": "joao.alberto1231@gmail.com",
          "gender": "M",
          "address": "Rua SP",
          "active": false
        },
        {
          "name": "Roberto Texeira",
          "email": "beto.texo@gmail.com",
          "gender": "M",
          "address": "Rua RJ",
          "active": false
        },
        {
          "name": "Sérgio Lagusta",
          "email": "sergalf@gmail.com",
          "gender": "M",
          "address": "Rua CE",
          "active": false
        }
        ] 
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('people', null, {});
  }
};
