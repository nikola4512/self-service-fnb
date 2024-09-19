const database = require("./config/db.js");
const models = require("./models/exportModels.js");

database
  .sync({ force: false })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => console.error("Error syncing the database:", err));
