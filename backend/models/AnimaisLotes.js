'use strict';
const { Model, DataTypes } = require('sequelize');

class AnimaisLotes extends Model {
  static init(sequelize){
    super.init({
        dt_entrada: DataTypes.DATE,
        dt_saida: DataTypes.DATE,
        dt_ultima_movimentacao: DataTypes.DATE,
        ic_bezerro: DataTypes.BOOLEAN
      }, {sequelize, modelName: 'AnimaisLotes', tableName: "animais_lotes"}
    )
  }
  static associate(models) {
  }
}

module.exports = AnimaisLotes;