const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

module.exports = sequelize.define("minimum_purchase", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  participans: {
    type: DataTypes.INTEGER,
  },
  minimumPurchase: {
    type: DataTypes.INTEGER,
  },
});
