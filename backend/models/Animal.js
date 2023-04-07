'use strict';
const { Model, DataTypes } = require('sequelize');

class Animal extends Model {
  static init(sequelize){
    super.init({
        id_fazenda: DataTypes.INTEGER,
        nome: DataTypes.STRING,
        raca: DataTypes.STRING,
        sexo: DataTypes.CHAR,
        dt_nascimento: DataTypes.DATEONLY
      }, {sequelize, modelName: 'Animal', tableName: "animal"}
    )
  }
  static associate(models) {
    this.belongsTo(models.Pessoa, {
      foreignKey: "fk_id_pessoa",
      as: "pessoa"
    });
    this.hasMany(models.AnimaisLotes, {
      foreignKey: "fk_id_animal",
      as: "relacoes"
    });
    this.belongsToMany(models.Lote, {
      foreignKey: "fk_id_lote",
      through: "AnimaisLotes",
      as: "lotes",
    });
  }
  getDataNascimento(){
    return []
  }
}

module.exports = Animal;