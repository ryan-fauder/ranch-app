'use strict';
const { Model, DataTypes } = require('sequelize');

class Animal extends Model {
  static init(sequelize){
    super.init({
        id_fazenda: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        raca: DataTypes.STRING,
        sexo: DataTypes.CHAR,
        dt_nascimento: DataTypes.DATE
      }, {sequelize, modelName: 'Animal', tableName: "animal"}
    )
  }
  static associate(models) {
    this.belongsTo(models.Person, {
      foreignKey: "fk_id_pessoa",
      as: "pessoa"
    });
    this.belongsToMany(models.Lote, {
      foreignKey: "fk_id_lote",
      through: "Animais_Lotes",
      as: "lotes",
    });
  }
}

module.exports = Animal;