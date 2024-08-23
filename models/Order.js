const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

module.exports = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
  },
  productId: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.STRING,
  },
  lineTotal: {
    type: DataTypes.INTEGER,
  },
  invoiceId: {
    type: DataTypes.INTEGER,
  },
});
