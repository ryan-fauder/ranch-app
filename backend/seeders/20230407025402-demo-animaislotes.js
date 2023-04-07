'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('animais_lotes', [
        {
          "dt_entrada": "2021-04-05",
          "dt_saida": "2022-04-05",
          "dt_ultima_movimentacao": "2023-04-05",
          "ic_bezerro": true,
          "fk_id_animal": 1,
          "fk_id_lote": 2
        },
        {
          "dt_entrada": "2021-04-05",
          "dt_saida": "2022-04-05",
          "dt_ultima_movimentacao": "2023-04-05",
          "ic_bezerro": true,
          "fk_id_animal": 1,
          "fk_id_lote": 1
        },
        {
          "dt_entrada": "2021-04-05",
          "dt_saida": "2022-04-05",
          "dt_ultima_movimentacao": "2023-04-05",
          "ic_bezerro": true,
          "fk_id_animal": 2,
          "fk_id_lote": 1
        },
        {
          "dt_entrada": "2021-04-05",
          "dt_saida": "2022-04-05",
          "dt_ultima_movimentacao": "2023-04-05",
          "ic_bezerro": true,
          "fk_id_animal": 3,
          "fk_id_lote": 1
        }
        ] 
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('animais_lotes', null, {});
  }
};
