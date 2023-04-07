'use strict';
const { Model, DataTypes } = require('sequelize');

class Pessoa extends Model {
  static init(sequelize){
    super.init({
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        sexo: DataTypes.CHAR,
        endereco: DataTypes.TEXT,
        ativo: DataTypes.BOOLEAN
      }, {sequelize, modelName: 'Pessoa', tableName: "pessoa"}
    )

  }
  static associate(models) {
    this.hasMany(models.Animal, {
      foreignKey: "fk_id_pessoa",
      as: "animais"
    });
  }
}

module.exports = Pessoa;