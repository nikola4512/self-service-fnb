const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Order = require("./Order.js");

const Invoice = sequelize.define("invoices", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
  },
  purchaseDetail: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.STRING,
  },
  tax: {
    type: DataTypes.STRING,
  },
  totalAmount: {
    type: DataTypes.INTEGER,
  },
});

Invoice.hasOne(Order);

module.exports = { Invoice };
