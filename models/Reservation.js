const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

module.exports = sequelize.define("reservations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reservationUrl: {
    type: DataTypes.STRING,
  },
  reservationPin: {
    type: DataTypes.STRING,
  },
  tableId: {
    type: DataTypes.INTEGER,
  },
  orderedId: {
    type: DataTypes.INTEGER,
  },
});
