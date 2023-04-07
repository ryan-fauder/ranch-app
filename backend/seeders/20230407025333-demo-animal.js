
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('animal', [
        {
          "id_fazenda": 10,
          "nome": "Taurum",
          "raca": "Boi Brahta",
          "sexo": "M",
          "dt_nascimento": "2023-04-19",
          "fk_id_pessoa": 1,
        },
        {
          "id_fazenda": 10,
          "nome": "Carlos Magnum",
          "raca": "Boi Magnesio",
          "sexo": "M",
          "dt_nascimento": "2023-04-19",
          "fk_id_pessoa": 1,
        },
        {
          "id_fazenda": 2,
          "nome": "Toninha",
          "raca": "Vaca Ruterfordio",
          "sexo": "F",
          "dt_nascimento": "2019-02-01",
          "fk_id_pessoa": 2,
        }
        ] 
      )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('animal', null, {});
  }
};
