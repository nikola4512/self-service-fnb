const express = require("express");
const authController = require("../controllers/auth");
const dashboardController = require("../controllers/user");

const router = express.Router();
router.get("/login", authController.loginView);
router.post("/login", authController.loginUser);
// router.get("/register", authController.registerView);
// router.post("/register", authController.registerUser);
router.get("/logout", authController.logoutUser);

module.exports = router;
