'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.belongsTo(models.User, {foreignKey: "userId", targetKey: "id", as: "userData"})
    }
  }
  Car.init({
    idCar: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    statusLock: DataTypes.BOOLEAN,
    startUseTime: DataTypes.DATE,
    endUseTime: DataTypes.DATE,
    lat:  DataTypes.STRING,
    lon:  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};