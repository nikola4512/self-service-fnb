const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

module.exports = sequelize.define("taxs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  rate: {
    type: DataTypes.FLOAT,
  },
});
