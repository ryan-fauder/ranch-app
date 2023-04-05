'use strict';
const { Model, DataTypes } = require('sequelize');

class Lote extends Model {
  static init(sequelize){
    super.init({
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
      }, {sequelize, modelName: 'Lote'}
    )
  }
  static associate(models) {
    this.belongsToMany(models.Animal, {   
      foreignKey: "fk_id_animal",
      through: "Animais_Lotes",
      as: "animais",
    });
  }
}

module.exports = Lote;