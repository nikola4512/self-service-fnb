const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const db = require("./db.js");
const { init: initAuth } = require("./auth");
const customerRoutes = require("./routes/customer.js");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard.js");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(expressLayouts);

initAuth();
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", customerRoutes);
app.use("/", authRoutes);
app.use("/", dashboardRoutes);

app.listen(PORT, console.log("Server is running on: http://localhost:" + PORT));
