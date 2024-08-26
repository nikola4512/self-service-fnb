const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

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
