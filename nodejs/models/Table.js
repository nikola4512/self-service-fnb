const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

module.exports = sequelize.define("tables", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  areaId: {
    type: DataTypes.INTEGER,
  },
  tableName: {
    type: DataTypes.STRING,
  },
  seatNumber: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
});
