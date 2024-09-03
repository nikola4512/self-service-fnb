const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Booking = sequelize.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer: {
    type: DataTypes.STRING,
  },
  orderId: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
  },
  participanNumber: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Booking;
