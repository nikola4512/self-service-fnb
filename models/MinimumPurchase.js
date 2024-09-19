const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

module.exports = sequelize.define("minimum_purchase", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  participants: {
    type: DataTypes.INTEGER,
  },
  minimumPurchase: {
    type: DataTypes.INTEGER,
  },
});
