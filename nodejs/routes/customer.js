const express = require("express");
const customerController = require("../controllers/customer");

const router = express.Router();

router.get("/", customerController.mainView);
router.get("/home", customerController.homeView);
router.get("/about-us", customerController.aboutUsView);
router.get("/booking", customerController.bookingView);
router.get("/order/:tableName", customerController.orderView);

module.exports = router;
