'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pessoa', [
        {
          "nome": "Maria Alfreda",
          "email": "alfreda@gmail.com",
          "sexo": "F",
          "endereco": "Rua GO",
          "ativo": true
        },
        {
          "nome": "João Alberto",
          "email": "joao.alberto1231@gmail.com",
          "sexo": "M",
          "endereco": "Rua SP",
          "ativo": false
        },
        {
          "nome": "Roberto Texeira",
          "email": "beto.texo@gmail.com",
          "sexo": "M",
          "endereco": "Rua RJ",
          "ativo": false
        },
        {
          "nome": "Sérgio Lagusta",
          "email": "sergalf@gmail.com",
          "sexo": "M",
          "endereco": "Rua CE",
          "ativo": false
        }
        ] 
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pessoa', null, {});
  }
};
