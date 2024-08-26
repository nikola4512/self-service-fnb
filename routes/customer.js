const express = require("express");
const customerController = require("../controllers/customer");
// const { protectRoute } = require("../auth");

const router = express.Router();

router.get("/", customerController.customerDashboardView);
router.get("/booking", customerController.bookingView);
router.get("/reservation/:tableName", customerController.reservationView);

module.exports = router;
