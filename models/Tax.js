const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

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
