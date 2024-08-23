const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

module.exports = sequelize.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
  },
  participanNumber: {
    type: DataTypes.INTEGER,
  },
  reservationId: {
    type: DataTypes.INTEGER,
  },
  orderedId: {
    type: DataTypes.INTEGER,
  },
});
