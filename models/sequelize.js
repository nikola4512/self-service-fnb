const { Sequelize } = require("sequelize");

// Sync models with the database
module.exports = new Sequelize("mvctest", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
