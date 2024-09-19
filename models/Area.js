const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Table = require("./Table.js");

const Area = sequelize.define("areas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  areaName: {
    type: DataTypes.STRING,
  },
});

Area.hasMany(Table);

module.exports = Area;
