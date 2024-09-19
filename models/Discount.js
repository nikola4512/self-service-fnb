const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

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
    type: DataTypes.STRING, // 'Rate' dan 'Fixed'
  },
  minimumPurchase: {
    type: DataTypes.INTEGER,
  },
  maximumPurchase: {
    type: DataTypes.INTEGER,
  },
  value: {
    type: DataTypes.FLOAT,
  },
});
