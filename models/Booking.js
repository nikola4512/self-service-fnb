const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Booking = sequelize.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reservationId: {
    type: DataTypes.INTEGER,
  },
  customer: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
  participanNumber: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Booking;
