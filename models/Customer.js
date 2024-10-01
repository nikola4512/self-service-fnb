const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const User = sequelize.define("customers", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  //   dateBirth: {
  //     type: DataTypes.DATE
  //   },
  //   phoneNumber: {
  //     type: DataTypes.STRING
  //   },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
