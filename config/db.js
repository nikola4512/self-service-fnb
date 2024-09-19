const path = require("path");
const { Sequelize } = require("sequelize");

// Sync models with the database
module.exports = new Sequelize("ss_fnb", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
