const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

module.exports = sequelize.define("invoices", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  productId: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.STRING,
  },
  taxId: {
    type: DataTypes.STRING,
  },
  discountId: {
    type: DataTypes.STRING,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
  },
});
