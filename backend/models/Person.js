'use strict';
const { Model, DataTypes } = require('sequelize');

class Person extends Model {
  static init(sequelize){
    super.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: DataTypes.CHAR,
        address: DataTypes.TEXT,
        active: DataTypes.BOOLEAN
      }, {sequelize, modelName: 'Person'}
    )

  }
  static associate(models) {
    this.hasMany(models.Animal, {
      foreignKey: "fk_id_pessoa",
      as: "animais"
    });
  }
}

module.exports = Person;