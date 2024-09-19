const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

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
  allergenIngredients: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  available: {
    type: DataTypes.BOOLEAN,
  },
});
