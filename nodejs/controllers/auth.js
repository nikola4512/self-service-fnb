const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

module.exports = {
  loginView: (req, res) => {
    res.render("login", {
      title: "Login",
      layout: "layouts/main-layout",
      user: req.user != undefined ? req.user : undefined,
    });
  },

  loginUser: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/cooked?loginsuccess",
      failureRedirect: "/login?error",
    })(req, res);
  },

  logoutUser: (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  },
};
