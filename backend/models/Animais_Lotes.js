'use strict';
const { Model, DataTypes } = require('sequelize');

class Animais_Lotes extends Model {
  static init(sequelize){
    super.init({
        dt_entrada: DataTypes.DATE,
        dt_saida: DataTypes.DATE,
        dt_ultima_movimentacao: DataTypes.DATE,
        ic_bezerro: DataTypes.BOOLEAN
      }, {sequelize, modelName: 'Animais_Lotes'}
    )
  }
  static associate(models) {
  }
}

module.exports = Animais_Lotes;