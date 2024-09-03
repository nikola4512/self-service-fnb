const express = require("express");
const userController = require("../controllers/user");
const { protectRoute } = require("../auth");

const router = express.Router();

// router.get("/dashboard", protectRoute, userController.dashboardView);
router.get("/cooked", userController.cookedView);

module.exports = router;
