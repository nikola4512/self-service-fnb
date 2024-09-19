const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING, // 'owner', 'cashier' and 'cook'
  },
});

module.exports = User;
