'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('lote', [
      {
        "nome": "Lote do Rio Azul",
        "descricao": "Um límpido rio, 30mx30m"
      },
      {
        "nome": "Lote do Jacarandá Amarelo",
        "descricao": "O belo Jacarandá, 50mx50m"
      },
      {
        "nome": "Lote do Ipê Roxo",
        "descricao": "Um grande ipê roxo, 20mx20m"
      },
      {
        "nome": "Lote das Árvore Verde",
        "descricao": "Muitas Árvores Verdes, 20mx20m"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lote', null, {});
  }
};
