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
    this.belongsToMany(models.Animal, {   
      foreignKey: "fk_id_animal",
      through: "AnimaisLotes",
      as: "animais",
    });
  }
}

module.exports = Lote;