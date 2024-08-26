const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

module.exports = {
  loginView: (req, res) => {
    res.render("login");
  },

  loginUser: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/booking?loginsuccess",
      failureRedirect: "/login?error",
    })(req, res);
  },

  logoutUser: (req, res) => {
    // TODO: complete
    res.redirect("login");
  },
};
