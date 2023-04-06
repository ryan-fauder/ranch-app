'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('animais_lotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_id_animal: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'animal',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      fk_id_lote: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'lote',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      dt_entrada: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      dt_saida: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      dt_ultima_movimentacao: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      ic_bezerro: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('animais_lotes');
  }
};
