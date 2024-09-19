const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

// const Invoice = require("./Invoice.js");
const Order = require("./Order.js");

const Reservation = sequelize.define("reservations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  invoiceId: {
    type: DataTypes.INTEGER,
  },
  tableId: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
  reservationPin: {
    type: DataTypes.STRING,
  },
});

// Reservation.hasOne(Invoice);
Reservation.hasMany(Order);

module.exports = Reservation;
