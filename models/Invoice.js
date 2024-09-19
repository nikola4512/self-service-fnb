const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Reservation = require("./Reservation.js");

const Invoice = sequelize.define("invoices", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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

Invoice.hasOne(Reservation);

module.exports = Invoice;
