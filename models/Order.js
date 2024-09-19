const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Order = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  reservationId: {
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

module.exports = Order;
