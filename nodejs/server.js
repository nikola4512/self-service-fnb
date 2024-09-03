const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const path = require("path");

const db = require("./db.js");

const passport = require("passport");
const { init: initAuth } = require("./auth");

const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customer.js");
const userRoutes = require("./routes/user.js");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

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
