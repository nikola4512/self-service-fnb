const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Booking = require("./Booking.js");
const Reservation = require("./Reservation.js");

const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bookingId: {
    type: DataTypes.INTEGER,
  },
  reservationId: {
    type: DataTypes.INTEGER,
  },
  invoiceId: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
  purchaseDetail: {
    type: DataTypes.STRING,
  },
  lineTotal: {
    type: DataTypes.INTEGER,
  },
});

Order.hasOne(Booking);
Order.hasOne(Reservation);

module.exports = Order;
