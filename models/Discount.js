const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

module.exports = sequelize.define("discounts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  value: {
    type: DataTypes.FLOAT,
  },
});
