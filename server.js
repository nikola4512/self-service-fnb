const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");

const database = require("./config/db.js");

const passport = require("passport");
const { init: initAuth } = require("./config/auth.js");

const authRoutes = require("./routes/auth.js");
const customerRoutes = require("./routes/customer.js");
const userRoutes = require("./routes/user.js");

const fs = require("fs");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 8080;

const swaggerSpec = YAML.parse(fs.readFileSync("doc.yaml", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

initAuth();
app.use(
  session({
    secret: "secret", //random secret key
    key: "connect.sid",
    saveUninitialized: false,
    resave: true,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/", customerRoutes);
app.use("/", userRoutes);
// app.use((req, res) => {
//   res.status(404).render("404", {
//     title: "404 Not Found!",
//     layout: "layouts/main-layout",
//   });
// });

app.listen(PORT, console.log("Server is running on: http://localhost:" + PORT));
