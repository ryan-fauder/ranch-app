'use strict';
const { Model, DataTypes } = require('sequelize');

class Lote extends Model {
  static init(sequelize){
    super.init({
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
      }, {sequelize, modelName: 'Lote', tableName: "lote"}
    )
  }
  static associate(models) {
    this.hasMany(models.AnimaisLotes, {
      foreignKey: "fk_id_lote",
      as: "relacoes"
    });
    this.belongsToMany(models.Animal, {   
      foreignKey: "fk_id_animal",
      through: "AnimaisLotes",
      as: "animais",
    });
  }
}

module.exports = Lote;