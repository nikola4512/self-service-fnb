const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Reservation = sequelize.define("reservations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer: {
    type: DataTypes.STRING,
  },
  tableId: {
    type: DataTypes.INTEGER,
  },
  orderId: {
    type: DataTypes.INTEGER,
  },
  reservationUrl: {
    type: DataTypes.STRING,
  },
  reservationPin: {
    type: DataTypes.STRING,
  },
});

module.exports = Reservation;
