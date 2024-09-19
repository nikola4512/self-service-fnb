const express = require("express");
const customerController = require("../controllers/customer");

const router = express.Router();

router.get("/", customerController.mainView);
router.get("/home", customerController.homeView);
// router.get("/order/:tableName", customerController.orderView); //booking (non-prioritas)

router.get("/reservation/:tableName", customerController.reservationBaseView);
// router.post("/reservation/:tableName", customerController.reservationBasePost);
// router.get("/reservation/:tableName/home", customerController.reservationHomeView);
// router.get("/reservation/:orderId/home", customerController.orderHomeView);

module.exports = router;
