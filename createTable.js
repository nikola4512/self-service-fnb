const models = require("./models/exportModels.js");
const db = require("./db.js");

db.sync({ force: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => console.error("Error syncing the database:", err));
