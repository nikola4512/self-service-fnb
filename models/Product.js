const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

module.exports = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  productName: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  available: {
    type: DataTypes.BOOLEAN,
  },
  price: {
    type: DataTypes.INTEGER,
  },
});
