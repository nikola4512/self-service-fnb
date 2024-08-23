const path = require("path");
const { Sequelize } = require("sequelize");

const Area = require("./models/Area");
const Booking = require("./models/Booking");
const Discount = require("./models/Discount");
const Invoice = require("./models/Invoice");
const MinimumPurchase = require("./models/MinimumPurchase");
const Order = require("./models/Order");
const Product = require("./models/Product");
const Reservation = require("./models/Reservation");
const Table = require("./models/Table");
const Tax = require("./models/Tax");
const User = require("./models/User");

// Entity-Relationship
{
  Booking.hasOne(Reservation);
  Booking.hasOne(Order);
  Booking.hasOne(User);

  Invoice.hasOne(Order);

  Order.hasOne(Booking);
  Order.hasOne(Reservation);
  Order.hasOne(Invoice);

  Reservation.hasOne(Order);
  Reservation.hasMany(User);
}

// Sync models with the database
const sequelize = new Sequelize("mvctest", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = {
  sequelize,
  Area,
  Booking,
  Discount,
  Invoice,
  MinimumPurchase,
  Order,
  Product,
  Reservation,
  Table,
  Tax,
  User,
};
