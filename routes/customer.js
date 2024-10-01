const express = require("express");
const customerController = require("../controllers/customer");

const router = express.Router();

router.get("/menu", customerController.menuView);

router.get("/reservation/:tableName", customerController.reservationBaseView);
router.post("/reservation/:tableName", customerController.reservationBasePost);

// router.get("/reservation/:tableName/home", customerController.reservationHomeView);
// router.get("/reservation/:orderId/home", customerController.orderHomeView);

module.exports = router;
