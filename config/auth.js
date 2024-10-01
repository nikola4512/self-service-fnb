const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportCustom = require("passport-custom");
const CustomStrategy = passportCustom.Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const Reservation = require("../models/Reservation.js");
const Table = require("../models/Table.js");

module.exports = {
  init: () => {
    // Strategi login untuk pengguna
    passport.use(
      "local-user",
      new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
          try {
            const user = await User.findOne({ where: { email } });
            if (!user) return done(null, false); // Jika user tidak ditemukan
            if (!bcrypt.compareSync(password, user.password))
              // Jika password salah
              return done(null, false);

            return done(null, { type: "user", data: user }); // Kembalikan data user
          } catch (err) {
            return done(err);
          }
        }
      )
    );

    // Strategi login untuk reservasi (misal dengan PIN)
    passport.use(
      "local-reserv",
      new LocalStrategy(
        { usernameField: "pin" }, // Anggap kita menggunakan PIN sebagai username
        async (pin, _, done) => {
          try {
            const reservation = await Reservation.findOne({ where: { pin } });
            if (!reservation) return done(null, false); // Jika reservasi tidak ditemukan

            return done(null, { type: "reserv", data: reservation }); // Kembalikan data reservasi
          } catch (err) {
            return done(err);
          }
        }
      )
    );

    // Serialisasi sesi
    passport.serializeUser((sessionObj, done) => {
      done(null, { type: sessionObj.type, id: sessionObj.data.id });
    });

    // Deserialisasi sesi
    passport.deserializeUser(async (sessionObj, done) => {
      try {
        if (sessionObj.type === "user") {
          const user = await User.findOne({ where: { id: sessionObj.id } });
          return done(null, { user }); // Set di req.user.user
        } else if (sessionObj.type === "reserv") {
          const reservation = await Reservation.findOne({
            where: { id: sessionObj.id },
          });
          return done(null, { reserve: reservation }); // Set di req.reserve
        }
      } catch (err) {
        done(err);
      }
    });
  },
  protectRoute: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login?next=" + req.url);
  },
  protectRouteReserv: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
};
