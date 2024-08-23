const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

module.exports = sequelize.define("areas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  areaId: {
    type: DataTypes.INTEGER,
  },
  tableName: {
    type: DataTypes.STRING,
  },
  seatNumber: {
    type: DataTypes.INTEGER,
  },
});
