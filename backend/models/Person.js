'use strict';
const { Model, DataTypes } = require('sequelize');

class Person extends Model {
  static init(sequelize){
    super.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        gender: DataTypes.CHAR,
        address: DataTypes.TEXT
      }, {sequelize, modelName: 'Person'}
    )

  }
  static associate(models) {
    // define association here
  }
}

module.exports = Person;